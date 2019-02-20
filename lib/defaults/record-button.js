'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = _styledComponents2.default.button.withConfig({
  displayName: 'record-button__Button',
  componentId: 'sc-1n5amwk-0'
})(['background:', ';color:', ';border-radius:50%;width:42px;height:42px;background:#eb2239;outline:none;border:none;cursor:pointer;'], function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.color;
});

var RecWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'record-button__RecWrapper',
  componentId: 'sc-1n5amwk-1'
})(['display:flex;flex-direction:column;align-items:center;']);

Button.defaultProps = {
  color: 'black',
  backgroundColor: 'white'
};

exports.default = function (props) {
  return _react2.default.createElement(
    RecWrapper,
    null,
    _react2.default.createElement(Button, props)
  );
};