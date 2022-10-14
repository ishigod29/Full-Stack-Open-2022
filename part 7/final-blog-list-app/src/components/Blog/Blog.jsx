import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, likesBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { Ancor, Button, ButtonLike, IconLike, LikeContainer, Text, Title } from './Blog.elements'

const Blog = ({ blog, mockHandler }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userAuth = useSelector((state) => state.auth)

  const updateLikes = () => {
    dispatch(likesBlog(blog))
    dispatch(setNotification(`${blog.title} added 1 more like`, 'info', 5))
  }

  const removeBlog = (id) => {
    if (window.confirm(`Remove ${blog.title} ?`)) {
      dispatch(deleteBlog(id))
      dispatch(setNotification(`${blog.title} is deleted`, 'info', 5))
      navigate('/')
    }
  }

  const Delete = () => {
    const userA = blog.user
    const userB = userAuth

    if (userA.username === userB.username) {
      return <Button onClick={() => removeBlog(blog.id)}>remove</Button>
    } else if (userA.id === userB.id) {
      return <Button onClick={() => removeBlog(blog.id)}>remove</Button>
    } else {
      return null
    }
  }

  return (
    <>
      <Title>{blog.title}</Title>
      <LikeContainer>
        <Text>{blog.likes} likes </Text>
        <ButtonLike
          id="like-button"
          onClick={mockHandler ? mockHandler : () => updateLikes(blog.id)}
        >
          <IconLike />
        </ButtonLike>
      </LikeContainer>
      <Ancor href={blog.url}>view website...</Ancor>
      <Text>created by {blog.author}</Text>
      <Text>added by {blog.user.username}</Text>
      {userAuth !== null ? Delete() : null}
    </>
  )
}

export default Blog
