import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addNewAnecdote = async (event) => {
    const anecdote = event.target.anecdote.value
    event.preventDefault()
    props.addAnecdote(anecdote)
    event.target.anecdote.value = ''

    props.setNotification(`new anecdote: '${anecdote}' added`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name="anecdote"/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm