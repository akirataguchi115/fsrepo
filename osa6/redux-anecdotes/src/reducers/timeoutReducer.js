const timeoutReducer = (state = '', action) => {
  switch (action.type) {
    case 'ID_SET':
      return action.data.id
    default:
      return state
  }
}

export const idSet = (id) => {
  return {
    type: 'ID_SET',
    data: {
      id,
    }
  }
}

export default timeoutReducer