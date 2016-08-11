export default class TransitionStack {
    constructor(bottomTransition) {
        this.stack = [bottomTransition];
    }

    push(transition) {
        return this.peek()[this.stack.length === 1 ? 'close' : 'closeNoAnimation']().then(() => {
            this.stack.push(transition);
            return transition.open();
        })
    }

    pop() {
        return this.stack.pop()[this.stack.length === 1 ? 'close' : 'closeNoAnimation']().then(() => {
            return this.peek().open(); 
        });
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }
}

