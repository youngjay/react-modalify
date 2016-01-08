'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _TransitionElement2 = require('./TransitionElement');

var _TransitionElement3 = _interopRequireDefault(_TransitionElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransitionOverlay = function (_TransitionElement) {
    _inherits(TransitionOverlay, _TransitionElement);

    function TransitionOverlay() {
        _classCallCheck(this, TransitionOverlay);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TransitionOverlay).apply(this, arguments));
    }

    _createClass(TransitionOverlay, [{
        key: 'open',
        value: function open() {
            (0, _utils.setStyle)(this.container, {
                overflow: 'hidden'
            });
            return _get(Object.getPrototypeOf(TransitionOverlay.prototype), 'open', this).call(this);
        }
    }, {
        key: 'close',
        value: function close() {
            (0, _utils.setStyle)(this.container, {
                overflow: ''
            });
            return _get(Object.getPrototypeOf(TransitionOverlay.prototype), 'close', this).call(this);
        }
    }]);

    return TransitionOverlay;
}(_TransitionElement3.default);

exports.default = TransitionOverlay;