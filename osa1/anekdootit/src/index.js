import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ value, text }) => (
  <button onClick={value}>
    {text}
  </button>
)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [array, setArray] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))
  const [max, setMax] = useState(0)

  const handleVote = () => {
    const copy = { ...array }
    copy[selected] += 1
    setArray(copy)

    var mox = array[0];
    var maxIndex = 0;
    for (var i = 0; i < 6; i++) {
      if (copy[i] > mox) {
        maxIndex = i;
        mox = copy[i];
      }
    }
    setMax(maxIndex)
  }

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{props.anecdotes[selected]}</div>
      <div>has {array[selected]} votes</div>
      <Button text="vote" value={handleVote} />
      <Button text="next anecdote" value={handleNext} />
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[max]}</div>
      <div>has {array[max]} votes</div>
    </div>
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