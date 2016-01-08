'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TransitionElement = require('./TransitionElement');

var _TransitionElement2 = _interopRequireDefault(_TransitionElement);

var _TransitionOverlay = require('./TransitionOverlay');

var _TransitionOverlay2 = _interopRequireDefault(_TransitionOverlay);

var _TransitionStack = require('./TransitionStack');

var _TransitionStack2 = _interopRequireDefault(_TransitionStack);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*

options:

    container: container to place modals, default is document.body
    duration: animation duration (millisecond)

  */

var defaultOptions = {
    duration: 300
};

var ModalFactory = function () {
    function ModalFactory(options) {
        _classCallCheck(this, ModalFactory);

        Object.assign(this, defaultOptions, options);

        var transitionOverlay = this.createTransitionOverlay();

        // use transitionOverlay as bottom transition
        var modalStack = new _TransitionStack2.default({
            close: transitionOverlay.open.bind(transitionOverlay),
            open: transitionOverlay.close.bind(transitionOverlay)
        });

        this.transitionOverlay = transitionOverlay;
        this.modalStack = modalStack;
    }

    _createClass(ModalFactory, [{
        key: 'createTransitionOverlay',
        value: function createTransitionOverlay() {
            return new _TransitionOverlay2.default({
                styles: {
                    base: {
                        display: 'none',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1000,

                        overflow: 'auto',
                        transition: 'all ' + this.duration / 1000 + 's ease-in'
                    },
                    show: {
                        backgroundColor: 'rgba(1,1,1,0.6)'
                    },
                    hide: {
                        backgroundColor: 'rgba(1,1,1,0)'
                    }
                },
                duration: this.duration,
                container: this.container
            });
        }
    }, {
        key: 'createTransitionModal',
        value: function createTransitionModal(modalStyles) {
            return new _TransitionElement2.default({
                styles: {
                    base: _extends({
                        display: 'none',
                        width: '600px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        margin: '3.5rem auto',
                        transition: 'all ' + this.duration / 1000 + 's ease-in'
                    }, modalStyles),
                    show: {
                        transform: 'translate(0, 0)',
                        opacity: 1
                    },
                    hide: {
                        transform: 'translate(0, -20px)',
                        opacity: 0
                    }
                },
                duration: this.duration,
                container: this.transitionOverlay.getElement()
            });
        }
    }, {
        key: 'create',
        value: function create(Component, modalStyles) {
            var transitionModal = this.createTransitionModal(modalStyles);
            var modalStack = this.modalStack;

            return function (props) {
                return new Promise(function (resolve) {
                    (0, _reactDom.render)(_react2.default.createElement(Component, _extends({}, props, {
                        close: function close(returnValue) {
                            if (modalStack.peek() === transitionModal) {
                                modalStack.pop().then(function () {
                                    resolve(returnValue);
                                });
                            }
                        }
                    })), transitionModal.getElement());

                    if (modalStack.peek() !== transitionModal) {
                        modalStack.push(transitionModal);
                    }
                });
            };
        }
    }]);

    return ModalFactory;
}();

exports.default = ModalFactory;