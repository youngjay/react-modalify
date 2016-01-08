import TransitionElement from './TransitionElement'
import TransitionOverlay from './TransitionOverlay'
import TransitionStack from './TransitionStack'

import React, {Component} from 'react'
import {render} from 'react-dom'

/*

options:

    container: container to place modals, default is document.body
    duration: animation duration (millisecond)

  */
 

const defaultOptions = {
    duration: 300
};

export default class ModalFactory {
    constructor(options) {
        Object.assign(this, defaultOptions, options);

        let transitionOverlay = this.createTransitionOverlay();

        // use transitionOverlay as bottom transition
        let modalStack = new TransitionStack({
            close: ::transitionOverlay.open,
            open: ::transitionOverlay.close
        });

        this.transitionOverlay = transitionOverlay;
        this.modalStack = modalStack;
    }

    createTransitionOverlay() {
        return new TransitionOverlay({
            styles: {
                base: {
                    display: 'none',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1000,

                    overflow: 'auto',
                    transition: 'all ' + this.duration / 1000 + 's ease-in'
                },
                show: {
                    backgroundColor: 'rgba(1,1,1,0.6)'
                },
                hide: {
                    backgroundColor: 'rgba(1,1,1,0)'
                }
            },
            duration: this.duration,
            container: this.container
        });
    }

    createTransitionModal(modalStyles) {
        return new TransitionElement({
            styles: {
                base: {
                    display: 'none',
                    width: '600px',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    margin: '3.5rem auto',
                    transition: 'all ' + this.duration / 1000 + 's ease-in',
                    ...modalStyles
                },
                show: {
                    transform: 'translate(0, 0)',
                    opacity: 1
                },
                hide: {
                    transform: 'translate(0, -20px)',
                    opacity: 0
                }
            },
            duration: this.duration,
            container: this.transitionOverlay.getElement()
        });  
    }

    create(Component, modalStyles) {
        let transitionModal = this.createTransitionModal(modalStyles);
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