import React, {Component} from 'react'
import {render} from 'react-dom'
import {modalify} from '../src/index'

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
            <div className="panel">
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
            <div className="panel">
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
            <div className="panel">
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

let modals = {
    notify: modalify(Notify),
    withCloseIcon: modalify(WithCloseIcon),
    receiveProps: modalify(ReceiveProps),
    customizeNotify: modalify(Notify, {
        modalStyles: {
            width: '300px',
            backgroundColor: '#ffeb38'          
        },

        modalTransitionShowStyles: {
            transform: 'scale(1)',
        },

        modalTransitionHideStyles: {
            transform: 'scale(0.5)',
        }
    }),
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