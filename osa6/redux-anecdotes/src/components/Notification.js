
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = () => {
    return props.notification
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hidden = {
    display: 'none'
  }
  if (props.notification === '') {
    return (
      <div style={hidden} >
        {notification()}
      </div >
    )
  } else {
    return (
      <div style={style}>
        {notification()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification