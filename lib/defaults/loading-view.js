'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingMessage = _styledComponents2.default.div.withConfig({
  displayName: 'loading-view__LoadingMessage',
  componentId: 'uxy82i-0'
})(['font-family:Arial;']);

exports.default = function () {
  return _react2.default.createElement(
    LoadingMessage,
    null,
    'Loading...'
  );
};