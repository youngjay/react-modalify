"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransitionStack = function () {
    function TransitionStack(bottomTransition) {
        _classCallCheck(this, TransitionStack);

        this.stack = [bottomTransition];
    }

    _createClass(TransitionStack, [{
        key: "push",
        value: function push(transition) {
            var _this = this;

            return this.peek().close(this.stack.length !== 1).then(function () {
                _this.stack.push(transition);
                return transition.open();
            });
        }
    }, {
        key: "pop",
        value: function pop() {
            var _this2 = this;

            return this.stack.pop().close(this.stack.length !== 1).then(function () {
                return _this2.peek().open(_this2.stack.length !== 1);
            });
        }
    }, {
        key: "peek",
        value: function peek() {
            return this.stack[this.stack.length - 1];
        }
    }]);

    return TransitionStack;
}();

exports.default = TransitionStack;