'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _unsupportedView = require('./defaults/unsupported-view');

var _unsupportedView2 = _interopRequireDefault(_unsupportedView);

var _errorView = require('./defaults/error-view');

var _errorView2 = _interopRequireDefault(_errorView);

var _disconnectedView = require('./defaults/disconnected-view');

var _disconnectedView2 = _interopRequireDefault(_disconnectedView);

var _loadingView = require('./defaults/loading-view');

var _loadingView2 = _interopRequireDefault(_loadingView);

var _renderActions = require('./defaults/render-actions');

var _renderActions2 = _interopRequireDefault(_renderActions);

var _getVideoInfo = require('./get-video-info');

var _getVideoInfo2 = _interopRequireDefault(_getVideoInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// data shows up on some browsers
// approx every 2 seconds
var chunkSizeInMS = 250;
var dataCheckInterval = 2000 / chunkSizeInMS;

var MIME_TYPES = ['video/webm;codecs=vp8', 'video/webm;codecs=h264', 'video/webm;codecs=vp9', 'video/webm'];

var CONSTRAINTS = {
  audio: true,
  video: true
};

var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'video-recorder__Wrapper',
  componentId: 'sc-7k20rv-0'
})(['position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden;min-height:300px;background-color:#000;color:white;box-sizing:border-box;*{box-sizing:inherit;}']);

var CameraView = _styledComponents2.default.div.withConfig({
  displayName: 'video-recorder__CameraView',
  componentId: 'sc-7k20rv-1'
})(['width:100%;height:100%;', ' ', ' text-align:center;'], function (props) {
  return !props.isReplayingVideo && 'display: flex;';
}, function (props) {
  return !props.isReplayingVideo && 'justify-content: center;';
});

var Video = _styledComponents2.default.video.withConfig({
  displayName: 'video-recorder__Video',
  componentId: 'sc-7k20rv-2'
})(['max-width:100%;max-height:100%;padding-top:48px;padding-bottom:75px;', ' ', ' ', ';'], function (props) {
  return props.isReplayingVideo && 'padding-top: 50px;';
}, function (props) {
  return props.isReplayingVideo && 'padding-bottom: 100px;';
}, function (props) {
  return props.onClick && 'cursor: pointer;';
});

var VideoRecorder = function (_Component) {
  _inherits(VideoRecorder, _Component);

  function VideoRecorder(props) {
    _classCallCheck(this, VideoRecorder);

    var _this = _possibleConstructorReturn(this, (VideoRecorder.__proto__ || Object.getPrototypeOf(VideoRecorder)).call(this, props));

    var isInlineRecordingSupported = !!window.MediaSource && !!window.MediaRecorder;

    var isVideoInputSupported = document.createElement('input').capture !== undefined;

    _this.state = {
      isRecording: false,
      isCameraOn: false,
      isConnecting: false,
      isReplayingVideo: false,
      isReplayVideoMuted: true,
      thereWasAnError: false,
      streamIsReady: false,
      isInlineRecordingSupported: isInlineRecordingSupported,
      isVideoInputSupported: isVideoInputSupported,
      stream: undefined
    };

    _this.handleSuccess = _this.handleSuccess.bind(_this);
    _this.turnOnCamera = _this.turnOnCamera.bind(_this);
    _this.turnOffCamera = _this.turnOffCamera.bind(_this);
    _this.handleError = _this.handleError.bind(_this);
    _this.handleStartRecording = _this.handleStartRecording.bind(_this);
    _this.handleStopRecording = _this.handleStopRecording.bind(_this);
    _this.handleDataAvailable = _this.handleDataAvailable.bind(_this);
    _this.handleStop = _this.handleStop.bind(_this);
    _this.handleStopReplaying = _this.handleStopReplaying.bind(_this);
    _this.renderCameraView = _this.renderCameraView.bind(_this);
    _this.handleVideoSelected = _this.handleVideoSelected.bind(_this);
    _this.handleOpenVideoInput = _this.handleOpenVideoInput.bind(_this);

    _this.timeSinceInactivity = 0;
    return _this;
  }

  _createClass(VideoRecorder, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.state.isInlineRecordingSupported) {
        this.mediaSource = new window.MediaSource();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.isInlineRecordingSupported && this.props.isOnInitially) {
        this.turnOnCamera();
      } else if (this.state.isVideoInputSupported && this.props.isOnInitially) {
        this.handleOpenVideoInput();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.replayVideo && this.state.isReplayingVideo && !prevState.isReplayingVideo) {
        this.replayVideo.addEventListener('loadedmetadata', function () {
          _this2.replayVideo.play();
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.turnOffCamera();
    }
  }, {
    key: 'turnOnCamera',
    value: function turnOnCamera(cameraType) {
      if (this.props.onTurnOnCamera) {
        this.props.onTurnOnCamera();
      }

      this.setState({
        isConnecting: true,
        isReplayingVideo: false,
        thereWasAnError: false
      });

      navigator.mediaDevices.getUserMedia(CONSTRAINTS).then(this.handleSuccess).catch(this.handleError);
    }
  }, {
    key: 'turnOffCamera',
    value: function turnOffCamera() {
      if (this.props.onTurnOffCamera) {
        this.props.onTurnOffCamera();
      }

      this.stream && this.stream.getTracks().forEach(function (stream) {
        return stream.stop();
      });
      this.setState({
        isCameraOn: false
      });
      clearInterval(this.inactivityTimer);
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(stream) {
      var _this3 = this;

      this.stream = stream;
      this.setState({
        isCameraOn: true,
        stream: stream
      });

      if (window.URL) {
        this.cameraVideo.srcObject = stream;
      } else {
        this.cameraVideo.src = stream;
      }

      // there is probably a better way
      // but this makes sure the start recording button
      // gives the steam a couple seconds to be ready
      // --- Ideally there would be a property to checkk....
      setTimeout(function () {
        _this3.setState({
          isConnecting: false,
          streamIsReady: true
        });
      }, 200);
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      var onError = this.props.onError;


      console.error('Captured error', err);

      clearTimeout(this.timeLimitTimeout);

      if (onError) {
        onError(err);
      }

      this.setState({
        isConnecting: this.state.isConnecting && false,
        isRecording: false,
        thereWasAnError: true
      });

      if (this.state.isCameraOn) {
        this.turnOffCamera();
      }
    }
  }, {
    key: 'onDataIssue',
    value: function onDataIssue(event) {
      console.error("Couldn't get data from event", event);
      this.handleError(new Error("Couldn't get data from event"));
      return false;
    }
  }, {
    key: 'getMimeType',
    value: function getMimeType() {
      if (this.props.mimeType) {
        return this.props.mimeType;
      }

      var mimeType = MIME_TYPES.find(window.MediaRecorder.isTypeSupported);

      return mimeType || '';
    }
  }, {
    key: 'isDataHealthOK',
    value: function isDataHealthOK(event) {
      if (!event.data) return this.onDataIssue(event);

      // in some browsers (FF/S), data only shows up
      // after a certain amount of time ~everyt 2 seconds
      var blobCount = this.recordedBlobs.length;
      if (blobCount > dataCheckInterval && blobCount % dataCheckInterval === 0) {
        var blob = new window.Blob(this.recordedBlobs, {
          type: this.getMimeType()
        });
        if (blob.size <= 0) return this.onDataIssue(event);
      }

      return true;
    }
  }, {
    key: 'handleDataAvailable',
    value: function handleDataAvailable(event) {
      if (this.isDataHealthOK(event)) {
        this.recordedBlobs.push(event.data);
      }
    }
  }, {
    key: 'handleStopRecording',
    value: function handleStopRecording() {
      if (this.props.onStopRecording) {
        this.props.onStopRecording();
      }

      if (!this.mediaRecorder) {
        this.handleError(new Error("Couldn't get mediaRecorder"));
        return;
      }

      this.mediaRecorder.stop();
    }
  }, {
    key: 'handleStartRecording',
    value: function handleStartRecording() {
      var _this4 = this;

      if (this.props.onStartRecording) {
        this.props.onStartRecording();
      }

      this.setState({
        isRunningCountdown: true,
        isReplayingVideo: false
      });

      setTimeout(function () {
        return _this4.startRecording();
      }, this.props.countdownTime);
    }
  }, {
    key: 'startRecording',
    value: function startRecording() {
      var _this5 = this;

      (0, _getVideoInfo.captureThumb)(this.cameraVideo).then(function (thumbnail) {
        _this5.thumbnail = thumbnail;

        _this5.recordedBlobs = [];
        var options = {
          mimeType: _this5.getMimeType()
        };

        try {
          _this5.setState({
            isRunningCountdown: false,
            isRecording: true
          });
          _this5.startedAt = new Date().getTime();
          _this5.mediaRecorder = new window.MediaRecorder(_this5.stream, options);
          _this5.mediaRecorder.onstop = _this5.handleStop;
          _this5.mediaRecorder.onerror = _this5.handleError;
          _this5.mediaRecorder.ondataavailable = _this5.handleDataAvailable;
          _this5.mediaRecorder.start(chunkSizeInMS); // collect 10ms of data

          var timeLimit = _this5.props.timeLimit;

          if (timeLimit) {
            _this5.timeLimitTimeout = setTimeout(function () {
              _this5.handleStopRecording();
            }, timeLimit);
          }

          // mediaRecorder.ondataavailable should be called every 10ms,
          // as that's what we're passing to mediaRecorder.start() above
          setTimeout(function () {
            if (_this5.recordedBlobs.length === 0) {
              console.error("Method mediaRecorder.ondataavailable wasn't called after 500ms");
              _this5.handleError(new Error("Method mediaRecorder.ondataavailable wasn't called after 500ms"));
            }
          }, 500);
        } catch (err) {
          console.error("Couldn't create MediaRecorder", err, options);
          _this5.handleError(err);
        }
      });
    }
  }, {
    key: 'handleStop',
    value: function handleStop(event) {
      var endedAt = new Date().getTime();

      if (!this.recordedBlobs || this.recordedBlobs.length <= 0) {
        console.error("Couldn't get recordedBlobs", event);
        this.handleError(new Error("Couldn't get recordedBlobs"));
        return;
      }

      clearTimeout(this.timeLimitTimeout);

      var videoBlob = new window.Blob(this.recordedBlobs, {
        type: this.getMimeType()
      });
      // const videoBlob = new window.Blob(this.recordedBlobs)
      var thumbnailBlob = this.thumbnail;
      var startedAt = this.startedAt;
      var duration = endedAt - startedAt;

      // if this gets executed to soon, the last chunk of data is lost on FF
      this.mediaRecorder.ondataavailable = null;

      this.setState({
        isRecording: false,
        isReplayingVideo: true,
        isReplayVideoMuted: true,
        videoBlob: videoBlob,
        videoUrl: window.URL.createObjectURL(videoBlob)
      });

      this.turnOffCamera();

      this.props.onRecordingComplete(videoBlob, startedAt, thumbnailBlob, duration);
    }
  }, {
    key: 'handleVideoSelected',
    value: function handleVideoSelected(e) {
      var _this6 = this;

      var files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) return;

      var startedAt = new Date().getTime();
      var video = files[0];

      var extension = video.type === 'video/quicktime' ? 'mov' : undefined;

      (0, _getVideoInfo2.default)(video).then(function (_ref) {
        var duration = _ref.duration,
            thumbnail = _ref.thumbnail;

        _this6.setState({
          isRecording: false,
          isReplayingVideo: true,
          isReplayVideoMuted: true,
          videoBlob: video,
          videoUrl: window.URL.createObjectURL(video)
        });

        _this6.props.onRecordingComplete(video, startedAt, thumbnail, duration, extension);
      }).catch(function (err) {
        _this6.handleError(err);
      });
    }
  }, {
    key: 'handleOpenVideoInput',
    value: function handleOpenVideoInput() {
      if (this.props.onOpenVideoInput) {
        this.props.onOpenVideoInput();
      }

      this.videoInput.click();
    }
  }, {
    key: 'handleStopReplaying',
    value: function handleStopReplaying() {
      if (this.props.onStopReplaying) {
        this.props.onStopReplaying();
      }

      this.setState({
        isReplayingVideo: false
      });

      if (this.state.isInlineRecordingSupported && this.props.isOnInitially) {
        this.turnOnCamera();
      } else if (this.state.isVideoInputSupported && this.props.isOnInitially) {
        this.handleOpenVideoInput();
      }
    }
  }, {
    key: 'renderCameraView',
    value: function renderCameraView() {
      var _this7 = this;

      var _props = this.props,
          renderDisconnectedView = _props.renderDisconnectedView,
          renderVideoInputView = _props.renderVideoInputView,
          renderUnsupportedView = _props.renderUnsupportedView,
          renderErrorView = _props.renderErrorView,
          renderLoadingView = _props.renderLoadingView;
      var _state = this.state,
          isVideoInputSupported = _state.isVideoInputSupported,
          isReplayingVideo = _state.isReplayingVideo,
          isInlineRecordingSupported = _state.isInlineRecordingSupported,
          thereWasAnError = _state.thereWasAnError,
          isCameraOn = _state.isCameraOn,
          isConnecting = _state.isConnecting,
          isReplayVideoMuted = _state.isReplayVideoMuted;


      var shouldUseVideoInput = !isInlineRecordingSupported && isVideoInputSupported;

      var videoInput = shouldUseVideoInput ? _react2.default.createElement('input', {
        ref: function ref(el) {
          return _this7.videoInput = el;
        },
        type: 'file',
        accept: 'video/*',
        capture: 'camcorder',
        style: { display: 'none' },
        onChange: this.handleVideoSelected
      }) : null;

      if (isReplayingVideo) {
        return _react2.default.createElement(
          CameraView,
          { key: 'replay', isReplayingVideo: true },
          _react2.default.createElement(Video, {
            ref: function ref(el) {
              return _this7.replayVideo = el;
            },
            src: this.state.videoUrl,
            loop: true,
            muted: isReplayVideoMuted,
            playsInline: true,
            autoPlay: true,
            onClick: function onClick() {
              if (_this7.replayVideo.paused) {
                _this7.replayVideo.play();
              }
              _this7.setState({ isReplayVideoMuted: !isReplayVideoMuted });
            },
            isReplayingVideo: true
          }),
          videoInput
        );
      }

      if (shouldUseVideoInput) {
        return renderVideoInputView({ videoInput: videoInput });
      }

      if (!isInlineRecordingSupported) {
        return renderUnsupportedView();
      }

      if (thereWasAnError) {
        return renderErrorView();
      }

      if (isCameraOn) {
        return _react2.default.createElement(
          CameraView,
          { key: 'camera' },
          _react2.default.createElement(Video, { ref: function ref(el) {
              return _this7.cameraVideo = el;
            }, autoPlay: true, muted: true })
        );
      }

      if (isConnecting) {
        return renderLoadingView();
      }

      return renderDisconnectedView();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          isVideoInputSupported = _state2.isVideoInputSupported,
          isInlineRecordingSupported = _state2.isInlineRecordingSupported,
          thereWasAnError = _state2.thereWasAnError,
          isRecording = _state2.isRecording,
          isCameraOn = _state2.isCameraOn,
          streamIsReady = _state2.streamIsReady,
          isConnecting = _state2.isConnecting,
          isRunningCountdown = _state2.isRunningCountdown,
          isReplayingVideo = _state2.isReplayingVideo,
          isReplayVideoMuted = _state2.isReplayVideoMuted;
      var _props2 = this.props,
          countdownTime = _props2.countdownTime,
          timeLimit = _props2.timeLimit;


      return _react2.default.createElement(
        Wrapper,
        null,
        this.renderCameraView(),
        this.props.renderActions({
          isVideoInputSupported: isVideoInputSupported,
          isInlineRecordingSupported: isInlineRecordingSupported,
          thereWasAnError: thereWasAnError,
          isRecording: isRecording,
          isCameraOn: isCameraOn,
          streamIsReady: streamIsReady,
          isConnecting: isConnecting,
          isRunningCountdown: isRunningCountdown,
          isReplayingVideo: isReplayingVideo,
          isReplayVideoMuted: isReplayVideoMuted,
          countdownTime: countdownTime,
          timeLimit: timeLimit,

          onTurnOnCamera: this.turnOnCamera,
          onTurnOffCamera: this.turnOffCamera,
          onOpenVideoInput: this.handleOpenVideoInput,
          onStartRecording: this.handleStartRecording,
          onStopRecording: this.handleStopRecording,
          onStopReplaying: this.handleStopReplaying
        })
      );
    }
  }]);

  return VideoRecorder;
}(_react.Component);

exports.default = VideoRecorder;


VideoRecorder.defaultProps = {
  renderUnsupportedView: function renderUnsupportedView() {
    return _react2.default.createElement(_unsupportedView2.default, null);
  },
  renderErrorView: function renderErrorView() {
    return _react2.default.createElement(_errorView2.default, null);
  },
  renderVideoInputView: function renderVideoInputView(_ref2) {
    var videoInput = _ref2.videoInput;
    return _react2.default.createElement(
      _react.Fragment,
      null,
      videoInput
    );
  },
  renderDisconnectedView: function renderDisconnectedView() {
    return _react2.default.createElement(_disconnectedView2.default, null);
  },
  renderLoadingView: function renderLoadingView() {
    return _react2.default.createElement(_loadingView2.default, null);
  },
  renderActions: _renderActions2.default,
  countdownTime: 3 * 1000
};