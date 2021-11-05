import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyVote, notifyClear } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)

  return (
    <div>
      {anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(notifyVote(anecdote.content))
              setTimeout(() => {
                dispatch(notifyClear())
              }, 5000)
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList