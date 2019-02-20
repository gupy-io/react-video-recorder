'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = _styledComponents2.default.button.withConfig({
  displayName: 'button__Button',
  componentId: 'hkteey-0'
})(['background:', ';color:', ';border-radius:4px;padding:17px 18px;border:none;margin:5px;font-size:18px;font-weight:bold;outline:none;cursor:pointer;:hover{background:#eee;}'], function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.color;
});

Button.defaultProps = {
  color: 'black',
  backgroundColor: 'white'
};

exports.default = Button;