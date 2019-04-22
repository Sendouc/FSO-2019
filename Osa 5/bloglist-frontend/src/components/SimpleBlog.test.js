import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

const blog = {
  author: 'Seppo',
  title: 'The Blog',
  likes: '60'
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Seppo'
  )

  expect(component.container).toHaveTextContent(
    'The Blog'
  )

  expect(component.container).toHaveTextContent(
    '60'
  )
})

test('two clicks equals two calls', () => {
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})