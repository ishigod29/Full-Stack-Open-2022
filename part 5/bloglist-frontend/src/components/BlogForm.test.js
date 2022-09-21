import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/> test component', () => {

  const mockHandler = jest.fn()

  test('when calling the event', () => {

    const component = render(
      <BlogForm mockHandler={mockHandler}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    fireEvent.change(title, {
      target: { value: 'testing the title field' }
    })
    fireEvent.change(author, {
      target: { value: 'testing the author field' }
    })
    fireEvent.change(url, {
      target: { value: 'testing the url field' }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing the title field')
    expect(mockHandler.mock.calls[0][0].author).toBe('testing the author field')
    expect(mockHandler.mock.calls[0][0].url).toBe('testing the url field')


  })
})