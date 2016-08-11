import {setStyle} from './utils'
import Transition from './Transition'

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
        setStyle(element, {
            ...this.styles.base,
            ...this.styles.hide,
            display: 'none'
        });
        this.transition = new Transition({
            element: element,
            styles: {
                show: this.styles.show,
                hide: this.styles.hide
            },
            duration: this.duration
        })
        this.container.appendChild(element);
        this.element = element;
    }

    open(notUseAnimation) {
        this.checkInit();
        return this.transition.open(notUseAnimation);
    }

    close(notUseAnimation) {
        this.checkInit();
        return this.transition.close(notUseAnimation);
    }

    getElement() {
        this.checkInit();
        return this.element;
    }
}