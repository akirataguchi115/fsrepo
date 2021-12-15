import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
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

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { ...likedBlog, user: blog.user },
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}
export default blogsReducer