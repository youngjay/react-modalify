import React, {Component} from 'react'
import {render} from 'react-dom'
import {modalify, ModalFactory} from '../src/index'

class Notify extends Component {
    render() {
        return (
            <div className="panel">
                <h1>Hello, Modalify!</h1>
                <div>
                    <button onClick={this.props.close}>OK</button>
                </div>
            </div>
        )
    }
}

class WithCloseIcon extends Component {
    render() {
        return (
            <div className="panel">
                <h1>Hello, Modalify!</h1>
                <div style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '0.5rem',
                    color: '#666',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }} onClick={this.props.close}>
                    ✕
                </div>
            </div>
        )
    }
}

class LongNotify extends Component {
    render() {
        return (
            <div className="panel">
                <h1>Hello, Modalify!</h1>
                <div style={{height: 1500}}>
                    very long content
                </div>
                <div>
                    <button onClick={this.props.close}>OK</button>
                </div>
            </div>
        )
    }
}

class ReceiveProps extends Component {
    render() {
        return (
            <div className="panel">
                <h1>{`Hello, ${this.props.user}!`}</h1>
                <div>
                    <button onClick={this.props.close}>OK</button>
                </div>
            </div>
        )
    }
}

class Confirm extends Component {
    render() {
        return (
            <div className="panel">
                <h1>Hello, Modalify!</h1>
                <div>
                    <button onClick={() => {
                        this.props.close('Yes');
                    }}>Yes</button>
                    <button onClick={() => {
                        this.props.close('No');
                    }}>No</button>
                </div>
            </div>
        )
    }
}

class NestedA extends Component {
    render() {
        return (
            <div className="panel" style={{width: 500, height: 300}}>
                <h1>This is NestedA</h1>
                <div>
                    <button onClick={() => {
                        modals.nestedB();
                    }}>show B</button>
                    <button onClick={() => {
                        this.props.close();
                    }}>back</button>
                </div>
            </div>
        )
    }
}

class NestedB extends Component {
    render() {
        return (
            <div className="panel" style={{width: 400, height: 200}}>
                <h1>This is NestedB</h1>
                <div>
                    <button onClick={() => {
                        modals.nestedC();
                    }}>show C</button>
                    <button onClick={() => {
                        this.props.close();
                    }}>back</button>
                </div>
            </div>
        )
    }
}

class NestedC extends Component {
    render() {
        return (
            <div className="panel" style={{width: 300, height: 100}}>
                <h1>This is NestedC</h1>
                <div>
                    <button onClick={() => {
                        this.props.close();
                    }}>back</button>
                </div>
            </div>
        )
    }
}

let modalFactory = new ModalFactory({
    overlayTransitionShowStyles: {
        backgroundColor: 'rgba(96,125,139,0.5)'        
    }
});

let modals = {
    notify: modalify(Notify),
    withCloseIcon: modalify(WithCloseIcon),
    longNotify: modalify(LongNotify),
    receiveProps: modalify(ReceiveProps),
    customizeNotify: modalify(Notify, {
        modalStyles: {
            width: '300px',
            backgroundColor: '#ffeb38'          
        },

        modalTransitionShowStyles: {
            transform: 'translate(0,0)',
        },

        modalTransitionHideStyles: {
            transform: 'translate(0,-40px)',
        }
    }),
    customizeOverlay: modalFactory.create(Notify),
    confirm: modalify(Confirm),
    nestedA: modalify(NestedA),
    nestedB: modalify(NestedB),
    nestedC: modalify(NestedC)
};

class Examples extends Component {
    render() {
        return (
            <ul>
                <li>                    
                    <button onClick={() => {
                        modals.notify();
                    }}>notify</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.withCloseIcon();
                    }}>withCloseIcon</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.longNotify();
                    }}>longNotify</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.receiveProps({
                            user: 'Tom'
                        });
                    }}>receiveProps</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.customizeNotify();
                    }}>customizeNotify</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.customizeOverlay();
                    }}>customizeOverlay</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.confirm().then((returnValue) => {
                            alert(`You choose [${returnValue}]`);
                        });
                    }}>confirm</button>
                </li>
                <li>                    
                    <button onClick={() => {
                        modals.nestedA();                       
                    }}>nested</button>
                </li>
            </ul>
        )
    }
}


var container = document.createElement('div');
document.body.appendChild(container);
render(<Examples/>, container);