"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var setStyle = exports.setStyle = function setStyle(element, styles) {
    Object.assign(element.style, styles);
};

var mix = exports.mix = function mix(a, b) {
    return Object.assign({}, a, b);
};