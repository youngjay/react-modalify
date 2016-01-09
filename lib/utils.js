'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
var setStyle = exports.setStyle = function setStyle(element, styles) {
    Object.assign(element.style, styles);
};

var mixDeep = exports.mixDeep = function mixDeep(a, b) {
    if (b === undefined) {
        return a;
    }
    if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
        return Object.keys(a).concat(Object.keys(b)).reduce(function (ret, key) {
            ret[key] = mixDeep(a[key], b[key]);
            return ret;
        }, {});
    }
    return b;
};