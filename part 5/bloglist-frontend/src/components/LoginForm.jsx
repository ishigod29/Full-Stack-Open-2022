import React from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  message,
  setMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ ...message, error: 'wrong username or password' })
      setTimeout(() => {
        setMessage({ ...message, error: null })
      }, 5000)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application </h1>
      <label htmlFor="username">username</label>{' '}
      <input
        type="text"
        value={username}
        name="username"
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="password">password</label>{' '}
      <input
        type="password"
        value={password}
        name="password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button id='login-button' type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default LoginForm
