import {setStyle} from './utils'
import TransitionElement from './TransitionElement'

export default class TransitionOverlay extends TransitionElement {
    open() {
        setStyle(this.container, {
            overflow: 'hidden'
        });
        return super.open();
    }

    close() {
        setStyle(this.container, {
            overflow: ''
        });
        return super.close();
    }
}