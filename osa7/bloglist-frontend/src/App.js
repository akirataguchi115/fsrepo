import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { notifyWith } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(notifyWith(`${user.name} welcome back!`, 'success'))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(notifyWith('wrong username/password'))
    }
  }

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog))
      dispatch(notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`, 'success'))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async (id) => {
    dispatch(removeBlog(id))
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) await blogService.remove(id)
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={addBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      )}
    </div>
  )
}

export default App