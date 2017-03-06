let resloveNow = new Promise((resolve) => {
    resolve();
});

const emptyTransition = {
    close: () => resloveNow,

    open: () => resloveNow
}

export default class TransitionStack {
    constructor(bottomTransition) {
        this.stack = [bottomTransition || emptyTransition];
    }

    push(transition) {
        return this.peek().close(this.stack.length !== 1).then(() => {
            this.stack.push(transition);
            return transition.open();
        })
    }

    pop() {
        return this.stack.pop().close(this.stack.length !== 1).then(() => {
            return this.peek().open(this.stack.length !== 1); 
        });
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }
}

