const initialState = null

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export default anecdoteReducer