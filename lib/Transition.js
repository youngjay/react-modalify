'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*

options:

    element: dom element
    styles.show: styles applied when open
    styles.hide: styles applied when close
    duration: animation duration (millisecond)

  */

var Transition = function () {
    function Transition(options) {
        var _this = this;

        _classCallCheck(this, Transition);

        Object.assign(this, options);
        this.element.addEventListener('transitionend', function (e) {
            e.stopPropagation();
            _this.checkTransitionEnd();
        });
    }

    _createClass(Transition, [{
        key: 'checkTransitionEnd',
        value: function checkTransitionEnd() {
            if (this.inTransition) {
                this.inTransition = false;
                this.onTransitionEnd();
            }
        }
    }, {
        key: 'open',
        value: function open() {
            var _this2 = this;

            return new Promise(function (resolve) {
                (0, _utils.setStyle)(_this2.element, {
                    display: 'block'
                });
                setTimeout(function () {
                    _this2.setTransitionStyles(_this2.styles.show, resolve);
                });
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this3 = this;

            return new Promise(function (resolve) {
                _this3.setTransitionStyles(_this3.styles.hide, function () {
                    (0, _utils.setStyle)(_this3.element, {
                        display: 'none'
                    });
                    resolve();
                });
            });
        }
    }, {
        key: 'setTransitionStyles',
        value: function setTransitionStyles(styles, callback) {
            var _this4 = this;

            this.onTransitionEnd = callback;
            (0, _utils.setStyle)(this.element, styles);
            this.inTransition = true;

            // transitionend 有时候会失效，所以这里要加一个事后check
            setTimeout(function () {
                _this4.checkTransitionEnd();
            }, this.duration + 100);
        }
    }]);

    return Transition;
}();

exports.default = Transition;