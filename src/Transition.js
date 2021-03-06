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

    open(notUseAnimation) {
        return new Promise((resolve) => {
            setStyle(this.element, {
                display: 'block'
            });

            if (notUseAnimation) {
                let transitionProp = this.element.style.transition;
                delete this.element.style.transition;
                setStyle(this.element, this.styles.show);
                this.element.style.transition = transitionProp;
                resolve();
            } else {
                // ensure display:block has been set
                setTimeout(() => {
                    this.setTransitionStyles(this.styles.show, resolve);
                }, 16);
            }            
        })
    }

    close(notUseAnimation) {
        return new Promise((resolve) => {
            if (notUseAnimation) {                
                let transitionProp = this.element.style.transition;
                delete this.element.style.transition;
                setStyle(this.element, {
                    ...this.styles.hide,
                    display: 'none'
                });
                this.element.style.transition = transitionProp;
                resolve();
            } else {
                this.setTransitionStyles(this.styles.hide, () => {
                    setStyle(this.element, {
                        display: 'none'
                    });
                    resolve();
                });
            }            
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