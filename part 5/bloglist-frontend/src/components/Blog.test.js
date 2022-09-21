import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/> test component', () => {
  const mockHandler = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'FullSatck Open',
    url: 'https://fullstackopen.com/es/part5/probando_aplicaciones_react',
    likes: 7,
    user: {
      id: '631a1d035f88cf89b4d7eab',
      name: 'Michell Castillo',
      username: 'Michell29'
    }
  }

  test('<Blog/> show only title and author by default', () => {

    const component = render(<Blog blog={blog} />)

    const div = component.container.querySelector('.items')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent('FullSatck Open')
  })

  test('show likes and url when button is pressed', () => {
    const component = render(
      <Blog blog={blog}/>
    )

    const likes = component.container.querySelector('.likes')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/es/part5/probando_aplicaciones_react'
    )

    expect(likes).toHaveTextContent(7)

  })

  test('calling the event handler twice', () => {
    const component = render(
      <Blog blog={blog} mockHandler={mockHandler}/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})