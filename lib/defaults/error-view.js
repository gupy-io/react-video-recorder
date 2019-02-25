'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = _styledComponents2.default.div.withConfig({
  displayName: 'error-view__Error',
  componentId: 'sw8zj8-0'
})(['white-space:pre-line;max-width:80%;']);

exports.default = function (_ref) {
  var browserErrorMessage = _ref.browserErrorMessage;
  return _react2.default.createElement(
    Error,
    null,
    browserErrorMessage
  );
};