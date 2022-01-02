import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleNewComment }) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState(blog.comments)

  const createComment = (event) => {
    event.preventDefault()
    handleNewComment(blog.id, content)
    setContent('')
    setComments(comments.concat({ content }))
  }

  if (!blog || !blog.comments) return null

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
      <form onSubmit={createComment}>
        <div>
          <input
            id='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button id="create">add comment</button>
      </form>
      <ul>
        {comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog