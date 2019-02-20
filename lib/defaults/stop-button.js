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
  displayName: 'stop-button__Button',
  componentId: 'sc-1h536gx-0'
})(['width:16px;height:16px;background-color:#fff;outline:none;border:none;cursor:pointer;']);

var Border = _styledComponents2.default.div.withConfig({
  displayName: 'stop-button__Border',
  componentId: 'sc-1h536gx-1'
})(['height:42px;width:42px;border-radius:50%;cursor:pointer;background-color:#eb2239;text-align:center;line-height:42px;']);

Button.defaultProps = {
  color: 'black',
  backgroundColor: 'white'
};

exports.default = function (props) {
  return _react2.default.createElement(
    Border,
    props,
    _react2.default.createElement(Button, null)
  );
};