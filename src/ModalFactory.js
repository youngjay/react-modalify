import TransitionElement from './TransitionElement'
import TransitionOverlay from './TransitionOverlay'
import TransitionStack from './TransitionStack'
import {mixDeep, mix} from './utils'

import React, {Component} from 'react'
import {render} from 'react-dom'


const getDefaultOptions = () => {
    return {
        /// overlay options ///    
        useOverlay: true,

        overlayTransitionDuration: 200,

        overlayTransitionShowStyles: {
            backgroundColor: 'rgba(0,0,0,0.5)'        
        },

        overlayTransitionHideStyles: {
            backgroundColor: 'rgba(0,0,0,0)'        
        },

        overlayStyles: {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            overflow: 'auto'
        },

        /// modal options ///
        
        modalTransitionDuration: 200,

        modalTransitionShowStyles: {
            transform: 'scale(1)',
            opacity: 1
        },

        modalTransitionHideStyles: {
            transform: 'scale(0.7)',
            opacity: 0      
        },

        modalStyles: {
            width: '60%',
            backgroundColor: 'white',
            borderRadius: '5px',
            margin: '3.5rem auto',
        }
    }
};

export default class ModalFactory {
    constructor(options) {
        this.options = mix(getDefaultOptions(), options);

        let transitionOverlay = this.createTransitionOverlay(this.options);

        // use transitionOverlay as bottom transition
        let modalStack = new TransitionStack(this.options.useOverlay ? {
            close: ::transitionOverlay.open,
            open: ::transitionOverlay.close
        } : null);

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
            container: options.useOverlay ? this.transitionOverlay.getElement() : document.body
        });   
    }

    create(Component, options) {
        let transitionModal = this.createTransitionModal(mix(this.options, options));
        let modalStack = this.modalStack;

        return (props) => new Promise((resolve) => {

            let close = (returnValue) => {
                if (modalStack.peek() === transitionModal) {
                    modalStack.pop().then(() => {
                        resolve(returnValue);
                    });
                }                
            };

            render(<Component
                {...props}       
                close={close}
            />, transitionModal.getElement());

            if (modalStack.peek() !== transitionModal) {
                modalStack.push(transitionModal);
            }
        })
    }
}