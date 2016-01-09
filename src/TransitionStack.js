export default class TransitionStack {
    constructor(bottomTransition) {
        this.stack = [bottomTransition];
    }

    push(transition) {    
        return this.peek().close().then(() => {
            this.stack.push(transition);
            return transition.open();
        })
    }

    pop() {
        return this.stack.pop().close().then(() => {
            return this.peek().open(); 
        });
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }
}

