import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({
  blogs,
  setBlogs,
  message,
  setMessage,
  blogFormRef,
  mockHandler
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()

    blogFormRef ? blogFormRef.current.toggleVisibility() : null

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const createBlog = async () => {
      try {
        const returnedBlog = await blogService.create(newBlog)

        setBlogs([...blogs, returnedBlog])

        setTitle('')
        setAuthor('')
        setUrl('')

        setMessage({ ...message, info: `${returnedBlog.title} added` })
        setTimeout(() => {
          setMessage({ ...message, info: null })
        }, 5000)
      } catch (exception) {
        setMessage({
          ...message,
          error:
            'fill in all the fields, each field requires at least 3 characters and the url of at least 8',
        })
        setTimeout(() => {
          setMessage({ ...message, error: null })
        }, 5000)
      }
    }

    mockHandler ? mockHandler({ title,author,url }) : createBlog()
  }

  return (
    <form id='form' onSubmit={addNewBlog}>
      <h1>create new</h1>
      <label htmlFor="username">title</label>{' '}
      <input
        type="text"
        value={title}
        name="title"
        id="title"
        onChange={({ target }) =>
          setTitle(target.value)
        }
      />
      <br />
      <label htmlFor="password">author</label>{' '}
      <input
        type="text"
        value={author}
        name="author"
        id="author"
        onChange={({ target }) =>
          setAuthor(target.value)
        }
      />
      <br />
      <label htmlFor="password">url</label>{' '}
      <input
        type="text"
        value={url}
        name="url"
        id="url"
        onChange={({ target }) =>
          setUrl(target.value)
        }
      />
      <br />
      <button id='create-button' type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired
}

export default BlogForm
