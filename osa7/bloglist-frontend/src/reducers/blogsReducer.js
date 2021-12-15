import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE_BLOG',
    data: id,
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: id,
  }
}
export default blogsReducer