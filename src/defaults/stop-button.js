import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 16px;
  height: 16px;
  background-color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
`

const Border = styled.div`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #eb2239;
  display: flex;
  justify-content: center;
  align-items: center;
`

Button.defaultProps = {
  color: 'black',
  backgroundColor: 'white'
}

export default props => (
  <Border {...props}>
    <Button />
  </Border>
)
