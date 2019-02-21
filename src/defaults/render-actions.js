import React from 'react'
import styled from 'styled-components'
import Button from './button'
import RecordButton from './record-button'
import RecordAnotherVideoButton from './record-another-video-button'
import StopButton from './stop-button'
import Timer from './timer'
import Countdown from './countdown'

const ActionsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${props => props.display};
  align-items: center;
  justify-content: center;
  padding: 17px;
  background-color: #000;
  width: 100%;
`

export default ({
  isVideoInputSupported,
  isInlineRecordingSupported,
  thereWasAnError,
  isRecording,
  isCameraOn,
  streamIsReady,
  isConnecting,
  isRunningCountdown,
  countdownTime,
  timeLimit,
  isReplayingVideo,

  onTurnOnCamera,
  onTurnOffCamera,
  onOpenVideoInput,
  onStartRecording,
  onStopRecording,
  onStopReplaying,
  onConfirm
}) => {
  const renderContent = () => {
    const shouldUseVideoInput =
      !isInlineRecordingSupported && isVideoInputSupported

    if (
      (!isInlineRecordingSupported && !isVideoInputSupported) ||
      thereWasAnError ||
      isConnecting ||
      isRunningCountdown
    ) {
      return null
    }

    if (isReplayingVideo) {
      return (
        <RecordAnotherVideoButton
          onClick={onStopReplaying}
          label='Gravar novamente'
        />
      )
    }

    if (isRecording) {
      return <StopButton onClick={onStopRecording} />
    }

    if (isCameraOn && streamIsReady) {
      return <RecordButton onClick={onStartRecording} />
    }

    return shouldUseVideoInput ? (
      <Button onClick={onOpenVideoInput}>Record a video</Button>
    ) : (
      <Button onClick={onTurnOnCamera}>Turn my camera ON</Button>
    )
  }

  return (
    <div>
      {isRecording && <Timer timeLimit={timeLimit} />}
      {isRunningCountdown && <Countdown countdownTime={countdownTime} />}
      <ActionsWrapper display={isRunningCountdown ? 'none' : 'flex'}>
        {renderContent()}
      </ActionsWrapper>
    </div>
  )
}
