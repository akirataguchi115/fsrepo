const notificationReducer = (action) => {
  return 'hmm'
}

export const notify = (notification) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        notification,
      }
    })
  }
}

export default notificationReducer