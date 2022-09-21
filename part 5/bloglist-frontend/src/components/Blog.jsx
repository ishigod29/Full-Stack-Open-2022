import React from 'react'
import PropTypes from 'prop-types'
import Collapse from './Collapse'
import blogService from '../services/blogs'

const Blog = ({ user, blog, blogs, setBlogs, message, setMessage, mockHandler }) => {

  const updateLikes = async (id) => {
    const blogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    try {
      const updatedBlog = await blogService.update(blogObject, id)
      setBlogs(blogs.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog)))
      setMessage({ ...message, info: `${blog.title} recived like` })
      setTimeout(() => {
        setMessage({ ...message, info: null })
      }, 5000)
    } catch (exception) {
      setMessage({
        ...message,
        error: `Information of ${blog.title} has alredy been removed from server`,
      })
      setTimeout(() => {
        setMessage({ ...message, error: null })
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    if (window.confirm(`Remove ${blog.title} ?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((b) => b.id !== id))
        setMessage({ ...message, info: `${blog.title} is removed` })
        setTimeout(() => {
          setMessage({ ...message, info: null })
        }, 5000)
      } catch (exception) {
        setMessage({
          ...message,
          error: `Information of ${blog.title} has alredy been removed from server`,
        })
        setTimeout(() => {
          setMessage({ ...message, error: null })
        }, 5000)
      }
    }
  }

  const Delete = () => {

    const user1 = blog.user
    const user2 = user

    if(user1.username === user2.username){
      return (
        <button onClick={() => removeBlog(blog.id)} className="b_remove">
            remove
        </button>
      )
    }else if(user1.id === user2.id){
      return (
        <button onClick={() => removeBlog(blog.id)} className="b_remove">
          remove
        </button>
      )
    }else{
      return ''
    }

  }

  return (
    <div className="items">
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <Collapse firstLabel="view" secondLabel="hide">
        <p>{blog.url ? blog.url : ''}</p>
        <p className='likes'>
          likes {blog.likes}{' '}
          <button id='like-button' onClick={mockHandler ? mockHandler : () => updateLikes(blog.id)}>like</button>
        </p>
        {Delete()}
      </Collapse>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default Blog
