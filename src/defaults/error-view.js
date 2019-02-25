import React from 'react'
import styled from 'styled-components'

const Error = styled.div`
  white-space: pre-line;
  max-width: 80%;
`

export default ({ browserErrorMessage }) => <Error>{browserErrorMessage}</Error>
