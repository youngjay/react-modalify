# react-modalify

Transform your plain react component into a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Install

```shell
npm install react-modalify --save
```

## Usage

Write your plain react component with a ```close``` prop that ```react-modalify``` passed in. Call it when you want close this modal.

```xml
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
```

Modalify it

```js
import {modalify} from 'react-modalify'

let notify = modalify(Notify);
```

Now you can use it

```js
notify()
```

## Features

### [examples](http://youngjay.github.io/react-modalify/examples/examples.html)

### Call modal() return a promise

```xml
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
```

```js
let confirm = modalify(Confirm);
confirm().then((returnValue) => {
	console.log(returnValue);
});
```

### Pass props via modal(props)

```xml
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
```

```js
let receiveProps = modalify(ReceiveProps);
receiveProps({
	user: 'Tom'
})
```

### Nested modals support

```react-modalify``` manage a stack of modals. So You can call modal() in another modal.

## API

### new ModalFactory(options[optional]: Object): ModalFactory

create a ModalFactory with [options](https://github.com/youngjay/react-modalify/blob/master/src/ModalFactory.js#L10-L53)

```js
let modalFactory = new ModalFactory({
    overlayTransitionShowStyles: {
        backgroundColor: 'rgba(96,125,139,0.5)'        
    }
});
```

### modalFactory.create(component: ReactComponent, options[optional]: Object): Modal

create a modal with a ReactComponent and [options](https://github.com/youngjay/react-modalify/blob/master/src/ModalFactory.js#L10-L53).

This options(if provided) will override the options in ModalFactory for current modal.

```js
let notify = modalFactory.create(Notify, {
    modalStyles: {	
        width: '300px',
        backgroundColor: '#ffeb38'   
	}
})
```

### modalify(options: Object): Modal

Shortcut for:

```js
export const modalify = ::(new ModalFactory()).create;
```

### modal(props: Object): Promise

Open a modal with props, and return a Promise.

```js
notify({
	user: 'Tom'
}).then((returnValue) => {
	console.log(returnValue);
})
```

## Notify the component to update when modal() was called

```react-modalify``` will set component's ```props``` every time it was called.

According to the [react lifecycle](http://facebook.github.io/react/docs/component-specs.html), the proper phases that you may put your code on are ```componentDidMount``` (for the first time) and ```componentWillReceiveProps```(for the later times)

## Thoughts for Modals in react

很多其它的react modal组件库，比如react-modal，react-portal。他们都是按照react的编程习惯。把modal组件也作为一个component放到使用的地方。这样会造成几个问题：

1. 在没有用到modal的时候，这个组件也会被渲染。为了避免这个问题，有些开发者重写component的生命周期，使modal只有被open的时候才渲染，而且渲染在当前节点之外。
1. 调用者要关心modal的位置。在列表中用到modal的话，则它会被重复渲染很多遍。
1. modal的打开状态到底是由调用者控制，还是由modal自己控制？这个关系到这个状态是用props还是用state。很显然modal不能自己打开自己，所以一定是调用者用props传入。但是大部分modal的关闭都不是调用者控制的，所以又得在dialog里面写state。导致这个状态相当的混乱。
1. 值的传递。大部分modal是需要返回结果给调用者的，使用component生成的组件传递返回值相当的麻烦，相当于子组件要修改父组件的值。

以上几个原因导致现在modal组件都写的非常奇技淫巧。但是回归本质，modal就是一个异步调用，它能返回结果, 这个跟promise的时候场景很像，比如ajax。

所以react-modalify反其道而行，把一个compoent转化成了一个promise调用。使用者并不关心modal应该渲染在哪里，modal的打开关闭状态应该怎么控制。只需要关心输入和输出即可。
