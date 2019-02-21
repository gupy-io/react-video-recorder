import React from 'react'
import styled from 'styled-components'
import Button from './button'
import RecordButton from './record-button'
import RecordAnotherVideoButton from './record-another-video-button'
import StopButton from './stop-button'
import Timer from './timer'
import Countdown from './countdown'
import FinishButtonWrapper from './finish-button-wrapper'
import FinishWarningMessage from './finish-warning-message'

const ActionsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${props => props.display};
  align-items: center;
  justify-content: center;
  padding: 17px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: center;
  }
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
  finishButton,
  finishWarningMessage,
  recordAnotherVideoLabel,

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
        <ButtonGroup>
          {finishWarningMessage && (
            <FinishWarningMessage>{finishWarningMessage}</FinishWarningMessage>
          )}
          {finishButton && (
            <FinishButtonWrapper>{finishButton}</FinishButtonWrapper>
          )}
          <RecordAnotherVideoButton
            onClick={onStopReplaying}
            label={recordAnotherVideoLabel}
          />
        </ButtonGroup>
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
