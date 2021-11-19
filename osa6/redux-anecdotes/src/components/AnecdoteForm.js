import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { idSet } from '../reducers/timeoutReducer'

const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification('create', content, 4).then(result => {
      clearTimeout(props.timeoutId)
      props.idSet(result)
    })
  }

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    timeoutId: state.timeoutId
  }
}

const mapDispatchtoProps = {
  createAnecdote,
  setNotification,
  idSet
}

export default connect(mapStateToProps, mapDispatchtoProps)(NewAnecdote)