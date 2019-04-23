import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newObject = action.data
      return state.map(a => a.id !== newObject.id ? a : newObject)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }

}

export const voteAnecdote = (object) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update({ ...object, votes: object.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: newAnecdote 
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer