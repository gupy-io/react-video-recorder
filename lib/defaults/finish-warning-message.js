'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FinishWarningMessage = _styledComponents2.default.div.withConfig({
  displayName: 'finish-warning-message__FinishWarningMessage',
  componentId: 'sc-1g60gia-0'
})(['font-family:Lato,sans-serif;font-size:12px;color:#fff;text-align:center;@media (min-width:768px){display:none;}']);

exports.default = function (props) {
  return _react2.default.createElement(
    FinishWarningMessage,
    props,
    props.children
  );
};