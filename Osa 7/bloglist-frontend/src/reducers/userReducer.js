import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    if (action.data) {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(action.data)
      )
      blogService.setToken(action.data.token)
    }
    return action.data
  case 'LOGOUT':
    window.localStorage.removeItem('loggedBlogappUser')
    return null
  default:
    return state
  }
}

export const logInFromStorage = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  let user = null
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
  }

  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logIn = user => {
  return async dispatch => {
    const loggedInUser = await loginService.login(user)
    dispatch({
      type: 'LOGIN',
      data: loggedInUser
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    dispatch({ type: 'LOGOUT' })
  }
}

export default userReducer