const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return 'you voted ' + action.data.content
    case 'NOTIFY_CREATE':
      return 'you created ' + action.data.content
    case 'NOTIFY_CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (type, content, duration) => {
  return async dispatch => {
    switch (type) {
      case 'vote':
        dispatch({
          type: 'NOTIFY_VOTE',
          data: {
            content,
            duration
          }
        })
        break
      case 'create':
        dispatch({
          type: 'NOTIFY_CREATE',
          data: {
            content,
            duration
          }
        })
        break
      default:
        return content
    }
    let ass = setTimeout(() => {
      dispatch(notifyClear())
    }, duration * 1000)
    return ass
  }
}

export const notifyClear = () => {
  return {
    type: 'NOTIFY_CLEAR',
  }
}

export default notificationReducer