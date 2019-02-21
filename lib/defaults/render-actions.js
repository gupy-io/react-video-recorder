'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _recordButton = require('./record-button');

var _recordButton2 = _interopRequireDefault(_recordButton);

var _recordAnotherVideoButton = require('./record-another-video-button');

var _recordAnotherVideoButton2 = _interopRequireDefault(_recordAnotherVideoButton);

var _stopButton = require('./stop-button');

var _stopButton2 = _interopRequireDefault(_stopButton);

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _countdown = require('./countdown');

var _countdown2 = _interopRequireDefault(_countdown);

var _finishButtonWrapper = require('./finish-button-wrapper');

var _finishButtonWrapper2 = _interopRequireDefault(_finishButtonWrapper);

var _finishWarningMessage = require('./finish-warning-message');

var _finishWarningMessage2 = _interopRequireDefault(_finishWarningMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionsWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'render-actions__ActionsWrapper',
  componentId: 'dp6lnv-0'
})(['position:absolute;bottom:0;left:0;right:0;display:', ';align-items:center;justify-content:center;padding:17px;width:100%;background-color:rgba(0,0,0,0.25);'], function (props) {
  return props.display;
});

var ButtonGroup = _styledComponents2.default.div.withConfig({
  displayName: 'render-actions__ButtonGroup',
  componentId: 'dp6lnv-1'
})(['display:flex;flex-direction:column;align-items:center;margin-bottom:20px;@media (min-width:768px){flex-direction:row-reverse;justify-content:center;}']);

exports.default = function (_ref) {
  var isVideoInputSupported = _ref.isVideoInputSupported,
      isInlineRecordingSupported = _ref.isInlineRecordingSupported,
      thereWasAnError = _ref.thereWasAnError,
      isRecording = _ref.isRecording,
      isCameraOn = _ref.isCameraOn,
      streamIsReady = _ref.streamIsReady,
      isConnecting = _ref.isConnecting,
      isRunningCountdown = _ref.isRunningCountdown,
      countdownTime = _ref.countdownTime,
      timeLimit = _ref.timeLimit,
      isReplayingVideo = _ref.isReplayingVideo,
      finishButton = _ref.finishButton,
      finishWarningMessage = _ref.finishWarningMessage,
      recordAnotherVideoLabel = _ref.recordAnotherVideoLabel,
      onTurnOnCamera = _ref.onTurnOnCamera,
      onTurnOffCamera = _ref.onTurnOffCamera,
      onOpenVideoInput = _ref.onOpenVideoInput,
      onStartRecording = _ref.onStartRecording,
      onStopRecording = _ref.onStopRecording,
      onStopReplaying = _ref.onStopReplaying,
      onConfirm = _ref.onConfirm;

  var renderContent = function renderContent() {
    var shouldUseVideoInput = !isInlineRecordingSupported && isVideoInputSupported;

    if (!isInlineRecordingSupported && !isVideoInputSupported || thereWasAnError || isConnecting || isRunningCountdown) {
      return null;
    }

    if (isReplayingVideo) {
      return _react2.default.createElement(
        ButtonGroup,
        null,
        finishWarningMessage && _react2.default.createElement(
          _finishWarningMessage2.default,
          null,
          finishWarningMessage
        ),
        finishButton && _react2.default.createElement(
          _finishButtonWrapper2.default,
          null,
          finishButton
        ),
        _react2.default.createElement(_recordAnotherVideoButton2.default, {
          onClick: onStopReplaying,
          label: recordAnotherVideoLabel
        })
      );
    }

    if (isRecording) {
      return _react2.default.createElement(_stopButton2.default, { onClick: onStopRecording });
    }

    if (isCameraOn && streamIsReady) {
      return _react2.default.createElement(_recordButton2.default, { onClick: onStartRecording });
    }

    return shouldUseVideoInput ? _react2.default.createElement(
      _button2.default,
      { onClick: onOpenVideoInput },
      'Record a video'
    ) : _react2.default.createElement(
      _button2.default,
      { onClick: onTurnOnCamera },
      'Turn my camera ON'
    );
  };

  return _react2.default.createElement(
    'div',
    null,
    isRecording && _react2.default.createElement(_timer2.default, { timeLimit: timeLimit }),
    isRunningCountdown && _react2.default.createElement(_countdown2.default, { countdownTime: countdownTime }),
    _react2.default.createElement(
      ActionsWrapper,
      { display: isRunningCountdown ? 'none' : 'flex' },
      renderContent()
    )
  );
};