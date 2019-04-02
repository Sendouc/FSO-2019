import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const VoteCount = ( {voteCount} ) => (
    <p>has {voteCount} votes</p>
)

const Button = ({ handleClick, text  }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
  const randomInteger = (min, max) => {
    const minNumber = Math.ceil(min)
    const maxNumber = Math.floor(max)
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
  }

  const [selected, setSelected] = useState(randomInteger(0, 5))
  const [points, setPoints] = useState(new Array(6+1).join('0').split('').map(parseFloat))  

  const handleNextClick = () => {
      setSelected(randomInteger(0, 5))
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  let i = points.indexOf(Math.max(...points));

  return (
    <>
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <VoteCount voteCount={points[selected]} />
        </div>
        <div>
            <Button text='next anecdote' handleClick={handleNextClick} />
            <Button text='vote' handleClick={handleVoteClick} />
        </div>
        <div>
            <h2>Anecdote with the most votes</h2>
            {props.anecdotes[i]}
            <VoteCount voteCount={points[i]} />
        </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
