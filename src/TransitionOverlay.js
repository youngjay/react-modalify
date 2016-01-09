import {setStyle} from './utils'
import TransitionElement from './TransitionElement'

export default class TransitionOverlay extends TransitionElement {
    open() {
        this.containerOverflow = this.container.style.overflow;
        setStyle(this.container, {
            overflow: 'hidden'
        });
        return super.open();
    }

    close() {
        setStyle(this.container, {
            overflow: this.containerOverflow
        });
        return super.close();
    }
}