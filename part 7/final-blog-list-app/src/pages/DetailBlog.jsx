import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog/Blog'
import { createNewComment, initializeComments } from '../reducers/commentReducer'
import { useField } from '../hooks/index'
import { Button, Form, DetailBlogContainer, Field, Input, SubTitle, ButtonSelectorLeft, ButtonSelectorRigth, CommentContainer } from '../styles/DetailBlog.elements'

const DetailBlog = () => {
  const comment = useField('text', 'comment')
  const [value, setValue] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(initializeComments(String(id)))
  }, [dispatch])

  const comments = useSelector((state) => state.comments)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  const createComment = (e) => {
    e.preventDefault()
    dispatch(createNewComment(comment.value,String(id)))
    comment.cleanField()
  }

  return (
    <DetailBlogContainer>
      <Blog blog={blog} />
      <SubTitle>comments</SubTitle>
      <ButtonSelectorLeft onClick={() => setValue(false)}>havent read this yet</ButtonSelectorLeft>
      <ButtonSelectorRigth onClick={() => setValue(true)}>add comment</ButtonSelectorRigth>
      {value ? (
        <Form style={{ gap: '20px', marginTop: '20px', maxWidth: '410px' }} onSubmit={createComment}>
          <Field>
            <Input
              type={comment.type}
              name={comment.name}
              onChange={comment.onChange}
              value={comment.value}
              id={comment.id}
            />
          </Field>
          <Button type="submit">add</Button>
        </Form>
      ) : (
        <CommentContainer>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </ul>
        </CommentContainer>
      )}
    </DetailBlogContainer>
  )
}

export default DetailBlog
