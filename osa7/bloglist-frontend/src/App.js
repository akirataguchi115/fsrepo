import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import loginService from './services/login'
import userService from './services/users'
import storage from './utils/storage'

import { notifyWith } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'
import { setUser, setUsername, setPassword, setUsers } from './reducers/userReducer'

import {
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import User from './components/User'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [])

  useEffect(() => {
    async function getUsers() {
      return await userService.getAll().then(response => {
        dispatch(setUsers(response))
      })
    }
    getUsers()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = user.username
      const password = user.password
      const loggedInUser = await loginService.login({
        username, password
      })
      dispatch(setUser(loggedInUser))
      storage.saveUser(loggedInUser)
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(notifyWith(`${loggedInUser.name} welcome back!`, 'success'))
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
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) dispatch(removeBlog(id))
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  if (!user.user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={user.username}
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={user.password}
              onChange={({ target }) => dispatch(setPassword(target.value))}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const match = useRouteMatch('/users/:id')
  const requestedUser = match
    ? user.users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Switch>
        <Route path="/users/:id">
          <User user={requestedUser} />
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <b>blogs created</b>
          {Object.keys(user.users).map((key, i) => (
            <div key={i}>
              <Link to={'/users/' + user.users[key].id}>
                <div key={i} style={{ width: '150px', float: 'left' }}>{user.users[key].name}</div>
              </Link>
              <div>{user.users[key].blogs.length}</div>
            </div>
          ))}
        </Route>
        <Route path="/">
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
        </Route>
      </Switch>

    </div>
  )
}

export default App