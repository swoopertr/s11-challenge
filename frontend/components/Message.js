import React from 'react'
import styled, { keyframes } from 'styled-components'
import PT from 'prop-types'
import { useSelector } from 'react-redux';



const opacity = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const StyledMessage = styled.div`
  animation: ${opacity} 1s forwards;
`

export default function Message() {
  const { message } = useSelector(store => store);  
  return (
    <StyledMessage key={message} id="message">
      {message}
    </StyledMessage>
  )
}
