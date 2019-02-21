'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FinishButtonWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'finish-button-wrapper__FinishButtonWrapper',
  componentId: 'sc-164nr4o-0'
})(['margin-top:22px;@media (min-width:768px){margin-left:30px;margin-top:0;}']);

exports.default = function (props) {
  return _react2.default.createElement(
    FinishButtonWrapper,
    props,
    props.children
  );
};