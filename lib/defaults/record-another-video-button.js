'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _videocam = require('../assets/videocam.png');

var _videocam2 = _interopRequireDefault(_videocam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordAnotherVideoButton = _styledComponents2.default.button.withConfig({
  displayName: 'record-another-video-button__RecordAnotherVideoButton',
  componentId: 'sc-1hjtzql-0'
})(['font-family:Lato,sans-serif;background-color:inherit;color:#fff;border:none;font-size:16px;font-weight:bold;cursor:pointer;margin-top:30px;@media (min-width:768px){margin-top:0;}']);

var VideocamImg = _styledComponents2.default.img.withConfig({
  displayName: 'record-another-video-button__VideocamImg',
  componentId: 'sc-1hjtzql-1'
})(['width:18px;margin-right:5px;vertical-align:top;']);

exports.default = function (props) {
  return _react2.default.createElement(
    RecordAnotherVideoButton,
    props,
    _react2.default.createElement(VideocamImg, { src: _videocam2.default }),
    props.label
  );
};