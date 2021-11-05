const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_SET':
      return action.data.filter
    default:
      return state
  }
}

export const filterSet = (filter) => {
  return {
    type: 'FILTER_SET',
    data: {
      filter,
    }
  }
}

export default filterReducer