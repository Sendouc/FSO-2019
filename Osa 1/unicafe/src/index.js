import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text  }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ( {text, value} ) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Stats = ( {good, neutral, bad} ) => {
    const count = good + neutral + bad
    let average = (good - bad) / count
    let positiveCount = good / count * 100
    if (count === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettua</p>
            </div>
        )
    }
    return (
        <div>
            <table>
                <thead>
                    <Statistic text='hyvä' value={good} />
                    <Statistic text='neutraali' value={good} />
                    <Statistic text='huono' value={bad} />
                    <Statistic text='yhteensä' value={count} />
                    <Statistic text='keskiarvo' value={average} />
                    <Statistic text='positiivisia (%)' value={positiveCount} />
                </thead>
            </table>
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
      setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>anna palautetta</h2>
      <Button handleClick={handleGoodFeedback} text='hyvä' />
      <Button handleClick={handleNeutralFeedback} text='neutraali' />
      <Button handleClick={handleBadFeedback} text='huono' />
      <h2>statistiikka</h2>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
