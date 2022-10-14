import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import image from '../image.svg'
import { Align, Image, LoginContainer } from '../styles/Login.elements'

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm/>
      <Align>
        <Image src={image} alt="Login-img" />
      </Align>
    </LoginContainer>
  )
}

export default Login