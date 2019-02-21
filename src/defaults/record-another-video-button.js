import React from 'react'
import styled from 'styled-components'

import Videocam from '../assets/videocam.png'

const RecordAnotherVideoButton = styled.button`
  font-family: Lato, sans-serif;
  background-color: inherit;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
`

const VideocamImg = styled.img`
  width: 18px;
  margin-right: 5px;
  vertical-align: top;
`

export default props => (
  <RecordAnotherVideoButton {...props}>
    <VideocamImg src={Videocam} />
    {props.label}
  </RecordAnotherVideoButton>
)
