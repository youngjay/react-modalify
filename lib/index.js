'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modalify = exports.ModalFactory = exports.TransitionStack = exports.TransitionOverlay = exports.TransitionElement = exports.Transition = undefined;

var _Transition2 = require('./Transition');

var _Transition3 = _interopRequireDefault(_Transition2);

var _TransitionElement2 = require('./TransitionElement');

var _TransitionElement3 = _interopRequireDefault(_TransitionElement2);

var _TransitionOverlay2 = require('./TransitionOverlay');

var _TransitionOverlay3 = _interopRequireDefault(_TransitionOverlay2);

var _TransitionStack2 = require('./TransitionStack');

var _TransitionStack3 = _interopRequireDefault(_TransitionStack2);

var _ModalFactory2 = require('./ModalFactory');

var _ModalFactory3 = _interopRequireDefault(_ModalFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Transition = _Transition3.default;
exports.TransitionElement = _TransitionElement3.default;
exports.TransitionOverlay = _TransitionOverlay3.default;
exports.TransitionStack = _TransitionStack3.default;
exports.ModalFactory = _ModalFactory3.default;

var defaultModalFactory = new _ModalFactory3.default();

var modalify = exports.modalify = function modalify(Component, modalStyles) {
    return defaultModalFactory.create(Component, modalStyles);
};