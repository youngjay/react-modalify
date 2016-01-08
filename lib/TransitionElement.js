'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _Transition = require('./Transition');

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*

styles: {
    base: {
    },
    show: {
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    hide: {
        backgroundColor: 'rgba(1,1,1,0)'
    }
},
duration: TRANSITION_DURATION,
container: document.body

 */

var TransitionElement = function () {
    function TransitionElement(options) {
        _classCallCheck(this, TransitionElement);

        Object.assign(this, options);
    }

    _createClass(TransitionElement, [{
        key: 'checkInit',
        value: function checkInit() {
            if (this.hasInited) {
                return;
            }
            this.hasInited = true;
            var element = document.createElement('div');
            (0, _utils.setStyle)(element, this.styles.base);
            (0, _utils.setStyle)(element, this.styles.hide);
            this.transition = new _Transition2.default({
                element: element,
                styles: this.styles,
                duration: this.duration
            });
            this.container.appendChild(element);
            this.element = element;
        }
    }, {
        key: 'open',
        value: function open() {
            this.checkInit();
            return this.transition.open();
        }
    }, {
        key: 'close',
        value: function close() {
            this.checkInit();
            return this.transition.close();
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            this.checkInit();
            return this.element;
        }
    }]);

    return TransitionElement;
}();

exports.default = TransitionElement;