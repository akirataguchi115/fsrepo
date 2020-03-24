import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ value, text }) => (
  <button onClick={value}>
    {text}
  </button>
)

const StatisticsLine = ({ value, text }) => {
  if (text === 'positive') {
    return (
      <React.Fragment>
        <td>
          {text}
        </td>
        <td>
          {value} %
        </td>
      </React.Fragment>)
  }
  return (
    <React.Fragment>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </React.Fragment>
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
      <table>
        <tbody>
          <tr>
            <StatisticsLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticsLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticsLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticsLine text="all" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticsLine text="average" value={(good * 1 + bad * -1) / (good + neutral + bad)} />
          </tr>
          <tr>
            <StatisticsLine text="positive" value={good / (good + neutral + bad)*100} />
          </tr>
        </tbody>
      </table>
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)