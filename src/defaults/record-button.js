import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.backgroundColor};
  color: ${props => props.color};
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background: #eb2239;
  outline: none;
  border: none;
  cursor: pointer;
`

const RecWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

Button.defaultProps = {
  color: 'black',
  backgroundColor: 'white'
}

export default props => (
  <RecWrapper>
    <Button {...props} />
  </RecWrapper>
)
