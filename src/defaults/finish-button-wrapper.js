import React from 'react'
import styled from 'styled-components'

const FinishButtonWrapper = styled.div`
  margin-top: 22px;

  @media (min-width: 768px) {
    margin-left: 30px;
    margin-top: 0;
  }
`

export default props => (
  <FinishButtonWrapper {...props}>{props.children}</FinishButtonWrapper>
)
