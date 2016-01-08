import {setStyle} from './utils'
import Transition from './Transition'

/*

styles: {
    base: {
    },
    show: {
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    hide: {
        backgroundColor: 'rgba(1,1,1,0)'
    }
},
duration: TRANSITION_DURATION,
container: document.body

 */

export default class TransitionElement {
    constructor(options) {
        Object.assign(this, options)
    }

    checkInit() {
        if (this.hasInited) {
            return;
        }
        this.hasInited = true;
        var element = document.createElement('div');
        setStyle(element, this.styles.base);
        setStyle(element, this.styles.hide);
        this.transition = new Transition({
            element: element,
            styles: this.styles,
            duration: this.duration
        })
        this.container.appendChild(element);
        this.element = element;
    }

    open() {
        this.checkInit();
        return this.transition.open();
    }

    close() {
        this.checkInit();
        return this.transition.close();
    }

    getElement() {
        this.checkInit();
        return this.element;
    }
}