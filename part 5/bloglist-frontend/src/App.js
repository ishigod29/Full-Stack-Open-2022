import React, { useEffect, useState, useRef } from 'react'
import blogService from './services/blogs'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ info: null, error: null })

  const blogFormRef = useRef()

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        setMessage({ ...message, error: exception.message })
        setTimeout(() => {
          setMessage({ ...message, error: null })
        }, 5000)
      }
    }

    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={message} setMessage={setMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          message={message}
          setMessage={setMessage}
        />
      ) : (
        <BlogsList
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs}
          message={message}
          setMessage={setMessage}
          blogFormRef={blogFormRef}
        />
      )}
    </div>
  )
}

export default App
