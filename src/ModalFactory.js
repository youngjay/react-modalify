import TransitionElement from './TransitionElement'
import TransitionOverlay from './TransitionOverlay'
import TransitionStack from './TransitionStack'
import {mixDeep} from './utils'

import React, {Component} from 'react'
import {render} from 'react-dom'


const defaultOptions = {
    /// overlay options ///    

    overlayTransitionDuration: 300,

    overlayTransitionShowStyles: {
        backgroundColor: 'rgba(1,1,1,0.6)'        
    },

    overlayTransitionHideStyles: {
        backgroundColor: 'rgba(1,1,1,0)'        
    },

    overlayStyles: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
    },

    /// modal options ///
    
    modalTransitionDuration: 300,

    modalTransitionShowStyles: {
        transform: 'translate(0, 0)',
        opacity: 1
    },

    modalTransitionHideStyles: {
        transform: 'translate(0, -3.5rem)',
        opacity: 0      
    },

    modalStyles: {
        width: '600px',
        backgroundColor: 'white',
        borderRadius: '5px',
        margin: '3.5rem auto',
    }
};

export default class ModalFactory {
    constructor(options) {
        this.options = mixDeep(defaultOptions, options);

        let transitionOverlay = this.createTransitionOverlay(this.options);

        // use transitionOverlay as bottom transition
        let modalStack = new TransitionStack({
            close: ::transitionOverlay.open,
            open: ::transitionOverlay.close
        });

        this.transitionOverlay = transitionOverlay;
        this.modalStack = modalStack;
    }

    createTransitionOverlay(options) {
        return new TransitionOverlay({
            styles: {
                base: {
                    ...options.overlayStyles,
                    transition: 'all ' + options.overlayTransitionDuration + 'ms ease-in'
                },
                show: options.overlayTransitionShowStyles,
                hide: options.overlayTransitionHideStyles
            },
            duration: options.overlayTransitionDuration,
            container: document.body
        });
    }

    createTransitionModal(options) {
        return new TransitionElement({
            styles: {
                base: {
                    ...options.modalStyles,
                    transition: 'all ' + options.modalTransitionDuration + 'ms ease-in'
                },
                show: options.modalTransitionShowStyles,
                hide: options.modalTransitionHideStyles
            },
            duration: options.modalTransitionDuration,
            container: this.transitionOverlay.getElement()
        });  
    }

    create(Component, options) {
        let transitionModal = this.createTransitionModal(mixDeep(this.options, options));

        let modalStack = this.modalStack;

        return (props) => new Promise((resolve) => {
            render(<Component
                {...props}       
                close={(returnValue) => {
                    if (modalStack.peek() === transitionModal) {
                        modalStack.pop().then(() => {
                            resolve(returnValue);
                        });
                    }
                    
                }}
            />, transitionModal.getElement());

            if (modalStack.peek() !== transitionModal) {
                modalStack.push(transitionModal);
            }
        })
    }
}