import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogInForm from './components/LogInForm'
import CreateNew from './components/CreateNew'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import useField from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const userName = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        userName: userName.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
    } catch (exception) {
      setNotificationWithTimeout('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const setNotificationWithTimeout = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <LogInForm
          login={handleLogin}
          userName={userName.form}
          password={password.form}
        />
      </div>
    )
  }
  return (
    <div className='Blogs'>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>
        {user.name ? user.name : user.userName} logged in
      </p>
      <button onClick={() => handleLogout()}>log out</button>
      <Toggleable buttonLabel='create new' ref={blogFormRef}>
        <CreateNew
          user={user}
          setNotificationWithTimeout={setNotificationWithTimeout}
          blogs={blogs}
          setBlogs={setBlogs}
          blogFormRef={blogFormRef}
        />
      </Toggleable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
        )}
    </div>
  )
}

export default App