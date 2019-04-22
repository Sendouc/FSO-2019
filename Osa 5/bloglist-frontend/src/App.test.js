import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.log'))
    const logIn = component.container.querySelectorAll('.log')
    expect(logIn.length).toBe(1)

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  it('when logged in blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blog'))
    const logIn = component.container.querySelectorAll('.blog')
    expect(logIn.length).toBe(6)
  })
})