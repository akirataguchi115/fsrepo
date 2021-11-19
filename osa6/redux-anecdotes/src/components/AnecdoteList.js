import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { idSet } from '../reducers/timeoutReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)
  const timeoutId = useSelector(({ timeoutId }) => timeoutId)

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
              dispatch(setNotification('vote', anecdote.content, 10))
              .then(result => {
                clearTimeout(timeoutId)
                dispatch(idSet(result))
              })
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList