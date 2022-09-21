import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogsList = ({
  blogs,
  setBlogs,
  user,
  setUser,
  message,
  setMessage,
  blogFormRef,
}) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      <h1>blogs</h1>

      {user ? (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : null}

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          message={message}
          setMessage={setMessage}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      <div>
        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map((blog, index) => {
            return (
              <Blog
                key={index}
                user={user}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                message={message}
                setMessage={setMessage}
              />
            )
          })}
      </div>
    </div>
  )
}

export default BlogsList
