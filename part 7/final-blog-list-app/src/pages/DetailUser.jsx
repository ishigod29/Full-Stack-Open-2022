import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DetailUserContainer, SubTitle } from '../styles/DetailUser.elements'

const DetailUser = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <DetailUserContainer>
      <SubTitle>{user.username}</SubTitle>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </DetailUserContainer>
  )
}

export default DetailUser
