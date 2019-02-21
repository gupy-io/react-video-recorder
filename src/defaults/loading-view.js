import React from 'react'
import styled from 'styled-components'

const LoadingMessage = styled.div`
  font-family: Lato;
`

export default props => <LoadingMessage>{props.label}</LoadingMessage>
