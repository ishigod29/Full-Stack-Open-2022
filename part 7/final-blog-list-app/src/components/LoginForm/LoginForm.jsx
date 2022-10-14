import React from 'react'
import { useDispatch } from 'react-redux'
import {  loginUser } from '../../reducers/authReducer'
import { useField } from '../../hooks/index'
import { useNavigate } from 'react-router-dom'
import { Button, Field, Form, Input, Label, SubTitle } from './LoginForm.elements'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value,password.value))
    username.cleanField()
    password.cleanField()
    navigate('/')
  }

  return (
    <Form onSubmit={handleLogin}>
      <SubTitle>log in to application </SubTitle>
      <Field>
        <Label htmlFor={username.id}>username</Label>{' '}
        <Input
          required
          type={username.type}
          value={username.value}
          name={username.name}
          id={username.id}
          onChange={username.onChange}
        />
      </Field>
      <Field>
        <Label htmlFor={password.id}>password</Label>{' '}
        <Input
          required
          type={password.type}
          value={password.value}
          name={password.name}
          id={password.id}
          onChange={password.onChange}
        />
      </Field>
      <Button id='login-button' type="submit">log in</Button>
    </Form>
  )
}

export default LoginForm
