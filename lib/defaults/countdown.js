'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = _styledComponents2.default.div.withConfig({
  displayName: 'countdown__Root',
  componentId: 'sc-19d3j7o-0'
})(['position:absolute;top:0;bottom:0;left:0;right:0;display:flex;justify-content:center;align-items:center;font-family:Menlo,monospace;font-size:100px;text-shadow:1px 2px rgba(0,0,0,0.5);']);

var Countdown = function (_Component) {
  _inherits(Countdown, _Component);

  function Countdown(props) {
    _classCallCheck(this, Countdown);

    var _this = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, props));

    _this.state = {
      number: props.countdownTime / 1000
    };

    _this.updateNumber = _this.updateNumber.bind(_this);
    return _this;
  }

  _createClass(Countdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.timeout = setTimeout(this.updateNumber, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timeout);
    }
  }, {
    key: 'updateNumber',
    value: function updateNumber() {
      var nextNumber = this.state.number - 1;
      this.setState({
        number: nextNumber
      });
      if (nextNumber !== 0) {
        this.timeout = setTimeout(this.updateNumber, 1000);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Root,
        null,
        this.state.number !== 0 ? this.state.number : null
      );
    }
  }]);

  return Countdown;
}(_react.Component);

exports.default = Countdown;