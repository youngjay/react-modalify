let passPromise = new Promise((resolve) => {
    resolve();
});

let defaultBottomTransition = {
    open: passPromise,
    close: passPromise
};

export default class TransitionStack {
    constructor(bottomTransition) {
        this.stack = [];
        this.stack.push(bottomTransition || defaultBottomTransition);
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

