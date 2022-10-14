import React from 'react'
import { createBlog } from '../../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks'
import { setNotification } from '../../reducers/notificationReducer'
import { Button, Field, Form, Input, Label, SubTitle } from './BlogForm.elements'
import Toggable from '../Toggable/Toggable'

const BlogForm = ({ mockHandler }) => {
  const dispatch = useDispatch()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const addNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(newBlog))

    title.cleanField()
    author.cleanField()
    url.cleanField()

    dispatch(setNotification(`added ${newBlog.title} correct`, 'info', 5))
    mockHandler ? mockHandler({ title,author,url }) : createBlog()
  }

  return (
    <Toggable buttonLabel="add new blog">
      <Form id='form' onSubmit={addNewBlog}>
        <SubTitle>add a new blog publication</SubTitle>
        <Field>
          <Label htmlFor={title.id}>title</Label>{' '}
          <Input
            required
            type={title.type}
            value={title.value}
            id={title.id}
            onChange={title.onChange}
          />
        </Field>
        <Field>
          <Label htmlFor={author.id}>author</Label>{' '}
          <Input
            required
            type={author.type}
            value={author.value}
            id={author.id}
            onChange={author.onChange}
          />
        </Field>
        <Field>
          <Label htmlFor={url.id}>url</Label>{' '}
          <Input
            required
            type={url.type}
            value={url.value}
            id={url.id}
            onChange={url.onChange}
          />
        </Field>
        <Button id='create-button' type="submit">press to add</Button>
      </Form>
    </Toggable>
  )
}



export default BlogForm
