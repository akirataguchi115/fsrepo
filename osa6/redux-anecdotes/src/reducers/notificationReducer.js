const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return `you voted '${action.data.content}'`
    case 'NOTIFY_CREATE':
      return `you created '${action.data.content}'`
    case 'NOTIFY_CLEAR':
      return ''
    default:
      return state
  }
}

export const notifyVote = (content) => {
  return {
    type: 'NOTIFY_VOTE',
    data: {
      content,
    }
  }
}

export const notifyCreate = (content) => {
  return {
    type: 'NOTIFY_CREATE',
    data: {
      content,
    }
  }
}

export const notifyClear = () => {
  return {
    type: 'NOTIFY_CLEAR',
  }
}

export default notificationReducer