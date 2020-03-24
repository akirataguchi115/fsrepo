import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  const handleGoodClick = () => {
    props.setGood(props.good + 1)
  }

  const handleNeutralClick = () => {
    props.setNeutral(props.neutral + 1)
  }

  const handleBadClick = () => {
    props.setBad(props.bad + 1)
  }
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h2>give feedback</h2>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.good + props.neutral + props.bad}</div>
      <div>average {(props.good * 1 + props.bad * -1) / (props.good + props.neutral + props.bad)}</div>
      <div>positive {props.good / (props.good + props.neutral + props.bad)} %</div>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (

    <div>
      <Statistics good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)