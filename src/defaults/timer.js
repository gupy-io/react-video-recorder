import React, { Component } from 'react'
import styled from 'styled-components'

import Alarm from '../assets/alarm.png'

const Text = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-family: Lato, sans-serif;
  font-size: 216x;
  text-align: right;
  background-color: #000;
  width: 100%;
  padding: 14px 25px;
`

const Img = styled.img`
  width: 17px;
  vertical-align: top;
  margin-right: 6px;
`

class Timer extends Component {
  constructor (props) {
    super(props)

    const nextSeconds = props.timeLimit ? props.timeLimit / 1000 : 0

    this.state = this.getState(nextSeconds)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentDidMount () {
    const { timeLimit } = this.props
    this.timer = setInterval(() => {
      const { seconds } = this.state
      const nextSeconds = timeLimit ? seconds - 1 : seconds + 1

      const nextState = this.getState(nextSeconds)
      this.setState(nextState)
    }, 1000)
  }

  pad (unit) {
    var str = '' + unit
    var pad = '00'
    return pad.substring(0, pad.length - str.length) + str
  }

  getState (seconds) {
    const minutes = Math.floor(seconds / 60)

    let humanTime = `${minutes}:${this.pad(seconds - minutes * 60)}`

    return {
      seconds: seconds,
      human: humanTime
    }
  }

  render () {
    const defaultText = this.props.defaultText || '0:00'
    return (
      <Text {...this.props}>
        <Img src={Alarm} />
        {this.state.human || defaultText}
      </Text>
    )
  }
}

export default Timer
