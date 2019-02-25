import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import UnsupportedView from './defaults/unsupported-view'
import ErrorView from './defaults/error-view'
import DisconnectedView from './defaults/disconnected-view'
import LoadingView from './defaults/loading-view'
import renderActions from './defaults/render-actions'
import getVideoInfo, { captureThumb } from './get-video-info'

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }
`

// data shows up on some browsers
// approx every 2 seconds
const chunkSizeInMS = 250
const dataCheckInterval = 2000 / chunkSizeInMS

const MIME_TYPES = [
  'video/webm;codecs=vp8',
  'video/webm;codecs=h264',
  'video/webm;codecs=vp9',
  'video/webm'
]

const CONSTRAINTS = {
  audio: true,
  video: true
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 300px;
  background-color: #000;
  color: white;
  box-sizing: border-box;
  * {
    box-sizing: inherit;
  }
`

const CameraView = styled.div`
  width: 100%;
  height: 100%;
  ${props => !props.isReplayingVideo && 'display: flex;'} ${props =>
  !props.isReplayingVideo && 'justify-content: center;'} text-align: center;
`

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  padding-top: 48px;
  padding-bottom: 75px;
  ${props => props.isReplayingVideo && 'padding-top: 50px;'} ${props =>
  props.isReplayingVideo && 'padding-bottom: 179px;'} ${props =>
  props.onClick && 'cursor: pointer;'};

  @media (min-width: 768px) {
    ${props => props.isReplayingVideo && 'padding-bottom: 94px;'};
  }
`

export default class VideoRecorder extends Component {
  constructor (props) {
    super(props)

    const isInlineRecordingSupported =
      !!window.MediaSource && !!window.MediaRecorder

    const isVideoInputSupported =
      document.createElement('input').capture !== undefined

    this.state = {
      isRecording: false,
      isCameraOn: false,
      isConnecting: false,
      isReplayingVideo: false,
      isReplayVideoMuted: true,
      thereWasAnError: false,
      streamIsReady: false,
      isInlineRecordingSupported,
      isVideoInputSupported,
      stream: undefined
    }

    this.handleSuccess = this.handleSuccess.bind(this)
    this.turnOnCamera = this.turnOnCamera.bind(this)
    this.turnOffCamera = this.turnOffCamera.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleStartRecording = this.handleStartRecording.bind(this)
    this.handleStopRecording = this.handleStopRecording.bind(this)
    this.handleDataAvailable = this.handleDataAvailable.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleStopReplaying = this.handleStopReplaying.bind(this)
    this.renderCameraView = this.renderCameraView.bind(this)
    this.handleVideoSelected = this.handleVideoSelected.bind(this)
    this.handleOpenVideoInput = this.handleOpenVideoInput.bind(this)

    this.timeSinceInactivity = 0
  }

  componentWillMount () {
    if (this.state.isInlineRecordingSupported) {
      this.mediaSource = new window.MediaSource()
    }
  }

  componentDidMount () {
    if (this.state.isInlineRecordingSupported && this.props.isOnInitially) {
      this.turnOnCamera()
    } else if (this.state.isVideoInputSupported && this.props.isOnInitially) {
      this.handleOpenVideoInput()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      this.replayVideo &&
      this.state.isReplayingVideo &&
      !prevState.isReplayingVideo
    ) {
      this.replayVideo.addEventListener('loadedmetadata', () => {
        this.replayVideo.play()
      })
    }
  }

  componentWillUnmount () {
    this.turnOffCamera()
  }

  turnOnCamera (cameraType) {
    if (this.props.onTurnOnCamera) {
      this.props.onTurnOnCamera()
    }

    this.setState({
      isConnecting: true,
      isReplayingVideo: false,
      thereWasAnError: false
    })

    navigator.mediaDevices
      .getUserMedia(CONSTRAINTS)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  turnOffCamera () {
    if (this.props.onTurnOffCamera) {
      this.props.onTurnOffCamera()
    }

    this.stream && this.stream.getTracks().forEach(stream => stream.stop())
    this.setState({
      isCameraOn: false
    })
    clearInterval(this.inactivityTimer)
  }

  handleSuccess (stream) {
    this.stream = stream
    this.setState({
      isCameraOn: true,
      stream: stream
    })

    if (window.URL) {
      this.cameraVideo.srcObject = stream
    } else {
      this.cameraVideo.src = stream
    }

    // there is probably a better way
    // but this makes sure the start recording button
    // gives the steam a couple seconds to be ready
    // --- Ideally there would be a property to checkk....
    setTimeout(() => {
      this.setState({
        isConnecting: false,
        streamIsReady: true
      })
    }, 200)
  }

  handleError (err) {
    const { onError } = this.props

    console.error('Captured error', err)

    clearTimeout(this.timeLimitTimeout)

    if (onError) {
      onError(err)
    }

    this.setState({
      isConnecting: this.state.isConnecting && false,
      isRecording: false,
      thereWasAnError: true
    })

    if (this.state.isCameraOn) {
      this.turnOffCamera()
    }
  }

  onDataIssue (event) {
    console.error("Couldn't get data from event", event)
    this.handleError(new Error("Couldn't get data from event"))
    return false
  }

  getMimeType () {
    if (this.props.mimeType) {
      return this.props.mimeType
    }

    const mimeType = MIME_TYPES.find(window.MediaRecorder.isTypeSupported)

    return mimeType || ''
  }

  isDataHealthOK (event) {
    if (!event.data) return this.onDataIssue(event)

    // in some browsers (FF/S), data only shows up
    // after a certain amount of time ~everyt 2 seconds
    const blobCount = this.recordedBlobs.length
    if (blobCount > dataCheckInterval && blobCount % dataCheckInterval === 0) {
      const blob = new window.Blob(this.recordedBlobs, {
        type: this.getMimeType()
      })
      if (blob.size <= 0) return this.onDataIssue(event)
    }

    return true
  }

  handleDataAvailable (event) {
    if (this.isDataHealthOK(event)) {
      this.recordedBlobs.push(event.data)
    }
  }

  handleStopRecording () {
    if (this.props.onStopRecording) {
      this.props.onStopRecording()
    }

    if (!this.mediaRecorder) {
      this.handleError(new Error("Couldn't get mediaRecorder"))
      return
    }

    this.mediaRecorder.stop()
  }

  handleStartRecording () {
    if (this.props.onStartRecording) {
      this.props.onStartRecording()
    }

    this.setState({
      isRunningCountdown: true,
      isReplayingVideo: false
    })

    setTimeout(() => this.startRecording(), this.props.countdownTime)
  }

  startRecording () {
    captureThumb(this.cameraVideo).then(thumbnail => {
      this.thumbnail = thumbnail

      this.recordedBlobs = []
      const options = {
        mimeType: this.getMimeType()
      }

      try {
        this.setState({
          isRunningCountdown: false,
          isRecording: true
        })
        this.startedAt = new Date().getTime()
        this.mediaRecorder = new window.MediaRecorder(this.stream, options)
        this.mediaRecorder.onstop = this.handleStop
        this.mediaRecorder.onerror = this.handleError
        this.mediaRecorder.ondataavailable = this.handleDataAvailable
        this.mediaRecorder.start(chunkSizeInMS) // collect 10ms of data

        const { timeLimit } = this.props
        if (timeLimit) {
          this.timeLimitTimeout = setTimeout(() => {
            this.handleStopRecording()
          }, timeLimit)
        }

        // mediaRecorder.ondataavailable should be called every 10ms,
        // as that's what we're passing to mediaRecorder.start() above
        setTimeout(() => {
          if (this.recordedBlobs.length === 0) {
            console.error(
              "Method mediaRecorder.ondataavailable wasn't called after 500ms"
            )
            this.handleError(
              new Error(
                "Method mediaRecorder.ondataavailable wasn't called after 500ms"
              )
            )
          }
        }, 500)
      } catch (err) {
        console.error("Couldn't create MediaRecorder", err, options)
        this.handleError(err)
      }
    })
  }

  handleStop (event) {
    const endedAt = new Date().getTime()

    if (!this.recordedBlobs || this.recordedBlobs.length <= 0) {
      console.error("Couldn't get recordedBlobs", event)
      this.handleError(new Error("Couldn't get recordedBlobs"))
      return
    }

    clearTimeout(this.timeLimitTimeout)

    const videoBlob = new window.Blob(this.recordedBlobs, {
      type: this.getMimeType()
    })
    // const videoBlob = new window.Blob(this.recordedBlobs)
    const thumbnailBlob = this.thumbnail
    const startedAt = this.startedAt
    const duration = endedAt - startedAt

    // if this gets executed to soon, the last chunk of data is lost on FF
    this.mediaRecorder.ondataavailable = null

    this.setState({
      isRecording: false,
      isReplayingVideo: true,
      isReplayVideoMuted: true,
      videoBlob,
      videoUrl: window.URL.createObjectURL(videoBlob)
    })

    this.turnOffCamera()

    this.props.onRecordingComplete(
      videoBlob,
      startedAt,
      thumbnailBlob,
      duration
    )
  }

  handleVideoSelected (e) {
    const files = e.target.files || e.dataTransfer.files
    if (files.length === 0) return

    const startedAt = new Date().getTime()
    const video = files[0]

    const extension = video.type === 'video/quicktime' ? 'mov' : undefined

    getVideoInfo(video)
      .then(({ duration, thumbnail }) => {
        this.setState({
          isRecording: false,
          isReplayingVideo: true,
          isReplayVideoMuted: true,
          videoBlob: video,
          videoUrl: window.URL.createObjectURL(video)
        })

        this.props.onRecordingComplete(
          video,
          startedAt,
          thumbnail,
          duration,
          extension
        )
      })
      .catch(err => {
        this.handleError(err)
      })
  }

  handleOpenVideoInput () {
    if (this.props.onOpenVideoInput) {
      this.props.onOpenVideoInput()
    }

    this.videoInput.click()
  }

  handleStopReplaying () {
    if (this.props.onStopReplaying && this.state.isInlineRecordingSupported) {
      this.props.onStopReplaying()
    }

    if (this.state.isInlineRecordingSupported) {
      this.setState({
        isReplayingVideo: false
      })
    }

    if (this.state.isInlineRecordingSupported && this.props.isOnInitially) {
      this.turnOnCamera()
    } else if (this.state.isVideoInputSupported && this.props.isOnInitially) {
      this.handleOpenVideoInput()
    }
  }

  renderCameraView () {
    const {
      renderDisconnectedView,
      renderVideoInputView,
      renderUnsupportedView,
      renderErrorView,
      renderLoadingView,
      loadingMessage,
      browserErrorMessage
    } = this.props

    const {
      isVideoInputSupported,
      isReplayingVideo,
      isInlineRecordingSupported,
      thereWasAnError,
      isCameraOn,
      isConnecting,
      isReplayVideoMuted
    } = this.state

    const shouldUseVideoInput =
      !isInlineRecordingSupported && isVideoInputSupported

    const videoInput = shouldUseVideoInput ? (
      <input
        ref={el => (this.videoInput = el)}
        type='file'
        accept='video/*'
        capture='camcorder'
        style={{ display: 'none' }}
        onChange={this.handleVideoSelected}
      />
    ) : null

    if (isReplayingVideo) {
      return (
        <CameraView key='replay' isReplayingVideo>
          <Video
            ref={el => (this.replayVideo = el)}
            src={this.state.videoUrl}
            loop
            muted={isReplayVideoMuted}
            playsInline
            autoPlay
            controls
            onClick={() => {
              if (this.replayVideo.paused) {
                this.replayVideo.play()
              }
              this.setState({ isReplayVideoMuted: !isReplayVideoMuted })
            }}
            isReplayingVideo
          />
          {videoInput}
        </CameraView>
      )
    }

    if (shouldUseVideoInput) {
      return renderVideoInputView({ videoInput })
    }

    if (!isInlineRecordingSupported) {
      return renderUnsupportedView()
    }

    if (thereWasAnError) {
      return renderErrorView(browserErrorMessage)
    }

    if (isCameraOn) {
      return (
        <CameraView key='camera'>
          <Video ref={el => (this.cameraVideo = el)} autoPlay muted />
        </CameraView>
      )
    }

    if (isConnecting) {
      return renderLoadingView(loadingMessage)
    }

    return renderDisconnectedView()
  }

  render () {
    const {
      isVideoInputSupported,
      isInlineRecordingSupported,
      thereWasAnError,
      isRecording,
      isCameraOn,
      streamIsReady,
      isConnecting,
      isRunningCountdown,
      isReplayingVideo,
      isReplayVideoMuted
    } = this.state

    const {
      countdownTime,
      timeLimit,
      finishButton,
      finishWarningMessage,
      recordAnotherVideoLabel
    } = this.props

    return (
      <Wrapper>
        <GlobalStyles />
        {this.renderCameraView()}
        {this.props.renderActions({
          isVideoInputSupported,
          isInlineRecordingSupported,
          thereWasAnError,
          isRecording,
          isCameraOn,
          streamIsReady,
          isConnecting,
          isRunningCountdown,
          isReplayingVideo,
          isReplayVideoMuted,
          countdownTime,
          timeLimit,
          finishButton,
          finishWarningMessage,
          recordAnotherVideoLabel,

          onTurnOnCamera: this.turnOnCamera,
          onTurnOffCamera: this.turnOffCamera,
          onOpenVideoInput: this.handleOpenVideoInput,
          onStartRecording: this.handleStartRecording,
          onStopRecording: this.handleStopRecording,
          onStopReplaying: this.handleStopReplaying
        })}
      </Wrapper>
    )
  }
}

VideoRecorder.defaultProps = {
  renderUnsupportedView: () => <UnsupportedView />,
  renderErrorView: browserErrorMessage => (
    <ErrorView browserErrorMessage={browserErrorMessage} />
  ),
  renderVideoInputView: ({ videoInput }) => <Fragment>{videoInput}</Fragment>,
  renderDisconnectedView: () => <DisconnectedView />,
  renderLoadingView: loadingMessage => <LoadingView label={loadingMessage} />,
  renderActions,
  countdownTime: 3 * 1000,
  finishButton: null,
  finishWarningMessage: null,
  recordAnotherVideoLabel: 'Record another video',
  loadingMessage: 'Loading...',
  browserErrorMessage:
    'Oh snap! Your browser failed to record your video. \n\n\n Please restart it and try again 👍'
}
