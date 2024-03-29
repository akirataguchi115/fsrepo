const blogsReducer = (state = { user: {}, username: '', password: '', users: [] }, action) => {
  switch (action.type) {
  case 'SET_USER':
    return { ...state, user: action.data }
  case 'SET_USERNAME':
    return { ...state, username: action.data }
  case 'SET_PASSWORD':
    return { ...state, password: action.data }
  case 'SET_USERS':
    return { ...state, users: action.data }
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  }
}
export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    data: username,
  }
}

export const setPassword = (password) => {
  return {
    type: 'SET_PASSWORD',
    data: password,
  }
}

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    data: users,
  }
}

export default blogsReducer