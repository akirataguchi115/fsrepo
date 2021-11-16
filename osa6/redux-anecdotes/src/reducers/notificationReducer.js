const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return action.data.content
    case 'NOTIFY_CREATE':
      return `you created '${action.data.content}'`
    case 'NOTIFY_CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY_VOTE',
      data: {
        content,
        duration
      }
    })
    setTimeout(() => {
      dispatch(notifyClear())
    }, duration * 1000)
  }
}

export const notifyClear = () => {
  return {
    type: 'NOTIFY_CLEAR',
  }
}

export default notificationReducer