import React from 'react'
import { filterSet } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterSet(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchtoProps = {
  filterSet
}

const ConnectedFilter = connect(null, mapDispatchtoProps)(Filter)

export default ConnectedFilter