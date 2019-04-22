import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM, findAllByTestId } from 'dom-testing-library'
import Blog from './Blog'

const blog = {
  author: 'Seppo',
  title: 'The Blog',
  likes: '60',
  user: {
    name: 'Himalaja',
    _id: 'a'
  }
}

const user = {
  id: 'a'
}

test('without click only name and author are rendered', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Seppo'
  )

  expect(component.container).toHaveTextContent(
    'The Blog'
  )

  expect(component.container).not.toHaveTextContent(
    '60'
  )
})

test('after expansion likes are displayed as well', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).not.toHaveTextContent(
    '60'
  )

  const div = component.getByText('The Blog - Seppo')
  fireEvent.click(div)

  expect(component.container).toHaveTextContent(
    '60'
  )
})