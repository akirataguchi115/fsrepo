import React from 'react'

const Blog = ({ blog, handleLike }) => {
  if (!blog) return null

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        <div>{blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
      <h4>comments</h4>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog