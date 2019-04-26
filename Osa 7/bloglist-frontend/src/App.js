import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

import Blogs from './components/Blogs'
import LogInForm from './components/LogInForm'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { logIn, logInFromStorage } from './reducers/userReducer'
import userService from './services/users'
import useField from './hooks/index'
import BlogDetailed from './components/BlogDetailed'
import Toggleable from './components/Toggleable'
import Menu from './components/Menu'

const App = (props) => {
  const userName = useField('text')
  const password = useField('password')
  const [users, setUsers] = useState([])

  const blogFormRef = React.createRef()

  const getUsers = async () => {
    const receivedUsers = await userService.getAll()
    setUsers(receivedUsers)
  }

  useEffect(() => {
    props.logInFromStorage()
    props.initBlogs()
    getUsers()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = { userName: userName.form.value, password: password.form.value }
      props.logIn(user)
    } catch (exception) {
      props.setNotification('wrong username or password')
    }
  }

  if (props.user === null) {
    return (
      <Container>
        <div>
          <Notification />
          <LogInForm
            login={handleLogin}
            userName={userName.form}
            password={password.form}
          />
        </div>
      </Container>
    )
  }
  return (
    <Container>
      <div>
        <Router>
          <div className='Blogs'>
            <Header size='huge'>Blog App</Header>
            <Notification />
            <Menu />
            <Route exact path="/blogs" render={() =>
              <div>
                <Toggleable ref={blogFormRef} buttonLabel='new blog'>
                  <CreateNew
                    user={props.user}
                    blogs={props.blogs}
                    blogFormRef={blogFormRef}
                  />
                </Toggleable>
                <Blogs />
              </div>
            } />
            <Route exact path="/users" render={() =>
              <Users users={users} />
            } />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={users.find(u => u._id === match.params.id)} />
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <BlogDetailed id={match.params.id} />
            } />
          </div>
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}


export default connect(mapStateToProps,
  { setNotification,
    initBlogs,
    logIn,
    logInFromStorage })(App)