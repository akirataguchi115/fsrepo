import React from 'react'

const User = (user) => {
  if (!user.user) {
    return null
  }
  return (
    <div>
      <h2>{user.user.name}</h2>
      <b>added blogs</b>
      <ul>
        {user.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User