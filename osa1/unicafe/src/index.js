import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ value, text }) => (
  <button onClick={value}>
    {text}
  </button>
)

const StatisticsLine = ({ value, text }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>give feedback</h2>
        <Button text="good" value={handleGoodClick} />
        <Button text="neutral" value={handleNeutralClick} />
        <Button text="bad" value={handleBadClick} />
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }
  return (

    <div>
      <h2>give feedback</h2>
      <Button text="good" value={handleGoodClick} />
      <Button text="neutral" value={handleNeutralClick} />
      <Button text="bad" value={handleBadClick} />
      <h2>statistics</h2>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={good + neutral + bad} />
      <StatisticsLine text="average" value={(good * 1 + bad * -1) / (good + neutral + bad)} />
      <StatisticsLine text="positive" value={good / (good + neutral + bad)} />
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)