import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Footer = () => {
  return (
    <FooterContainer>
      <em>Blog List App, Department of Computer Science 2022</em>
    </FooterContainer>
  )
}

export default Footer