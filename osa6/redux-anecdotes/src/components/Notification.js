
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hidden = {
    display: 'none'
  }
  if (notification === '') {
    return (
      <div style={hidden} >
        {notification}
      </div >
    )
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification