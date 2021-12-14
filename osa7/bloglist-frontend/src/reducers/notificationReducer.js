const notificationReducer = (state = { message: '', type: '' }, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    state = { ...state, message: action.data.message }
    state = { ...state, type: action.data.type }
    return state
  case 'CLEAR_NOTIFICATION':
    return { message: '', type: '' }
  default:
    return state
  }
}

export const notifyWith = (message, type) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: { message, type },
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}
export default notificationReducer