'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    'Oh snap! Your browser failed to record your video.',
    _react2.default.createElement('br', null),
    _react2.default.createElement('br', null),
    'Please restart it and try again \uD83D\uDC4D'
  );
};