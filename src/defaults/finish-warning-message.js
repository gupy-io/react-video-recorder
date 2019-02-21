import React from 'react'
import styled from 'styled-components'

const FinishWarningMessage = styled.div`
  font-family: Lato, sans-serif;
  font-size: 12px;
  color: #fff;
  text-align: center;
`

export default props => (
  <FinishWarningMessage {...props}>{props.children}</FinishWarningMessage>
)
