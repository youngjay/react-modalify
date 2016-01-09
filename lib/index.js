'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modalify = exports.ModalFactory = undefined;

var _ModalFactory = require('./ModalFactory');

var _ModalFactory2 = _interopRequireDefault(_ModalFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ModalFactory = _ModalFactory2.default;

var defaultModalFactory = new _ModalFactory2.default();

var modalify = exports.modalify = function modalify(Component, modalStyles) {
    return defaultModalFactory.create(Component, modalStyles);
};