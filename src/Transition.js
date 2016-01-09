import {setStyle} from './utils'


/*

options:

    element: dom element
    styles.show: styles applied when open
    styles.hide: styles applied when close
    duration: animation duration (millisecond)

  */
export default class Transition {
    constructor(options) {
        Object.assign(this, options);
        this.element.addEventListener('transitionend', (e) => {
            e.stopPropagation();
            this.checkTransitionEnd();
        });
    }

    checkTransitionEnd() {
        if (this.inTransition) {            
            this.inTransition = false;
            this.onTransitionEnd();
        }
    }

    open() {
        return new Promise((resolve) => {
            setStyle(this.element, {
                display: 'block'
            });
            setTimeout(() => {
                this.setTransitionStyles(this.styles.show, resolve);
            })
        })
    }

    close() {
        return new Promise((resolve) => {    
            this.setTransitionStyles(this.styles.hide, () => {
                setStyle(this.element, {
                    display: 'none'
                });
                resolve();
            });
        })
    }

    setTransitionStyles(styles, callback) {
        this.onTransitionEnd = callback;
        setStyle(this.element, styles);
        this.inTransition = true;

        // "transitionend" don't work sometimes.
        // additional check
        setTimeout(() => {
            this.checkTransitionEnd();
        }, this.duration + 100);
    }
}