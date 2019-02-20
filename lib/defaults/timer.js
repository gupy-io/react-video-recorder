'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _alarm = require('../assets/alarm.png');

var _alarm2 = _interopRequireDefault(_alarm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _styledComponents2.default.div.withConfig({
  displayName: 'timer__Text',
  componentId: 'avqbub-0'
})(['position:absolute;top:0;right:0;font-family:Lato,sans-serif;font-size:216x;text-align:right;background-color:#000;width:100%;padding:14px 25px;']);

var Img = _styledComponents2.default.img.withConfig({
  displayName: 'timer__Img',
  componentId: 'avqbub-1'
})(['width:17px;vertical-align:top;margin-right:6px;']);

var Timer = function (_Component) {
  _inherits(Timer, _Component);

  function Timer(props) {
    _classCallCheck(this, Timer);

    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

    var nextSeconds = props.timeLimit ? props.timeLimit / 1000 : 0;

    _this.state = _this.getState(nextSeconds);
    return _this;
  }

  _createClass(Timer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var timeLimit = this.props.timeLimit;

      this.timer = setInterval(function () {
        var seconds = _this2.state.seconds;

        var nextSeconds = timeLimit ? seconds - 1 : seconds + 1;

        var nextState = _this2.getState(nextSeconds);
        _this2.setState(nextState);
      }, 1000);
    }
  }, {
    key: 'pad',
    value: function pad(unit) {
      var str = '' + unit;
      var pad = '00';
      return pad.substring(0, pad.length - str.length) + str;
    }
  }, {
    key: 'getState',
    value: function getState(seconds) {
      var minutes = Math.floor(seconds / 60);

      var humanTime = minutes + ':' + this.pad(seconds - minutes * 60);

      return {
        seconds: seconds,
        human: humanTime
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultText = this.props.defaultText || '0:00';
      return _react2.default.createElement(
        Text,
        this.props,
        _react2.default.createElement(Img, { src: _alarm2.default }),
        this.state.human || defaultText
      );
    }
  }]);

  return Timer;
}(_react.Component);

exports.default = Timer;