import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    props.filteredAnecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.toLowerCase()
  .includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  setNotification,
  voteAnecdote
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList