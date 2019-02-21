import React from 'react'
import styled from 'styled-components'

const FinishButtonWrapper = styled.div`
  margin-top: 22px;
`

export default props => (
  <FinishButtonWrapper {...props}>{props.children}</FinishButtonWrapper>
)
