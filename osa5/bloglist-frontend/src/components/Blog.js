import React, { useState } from 'react'
import Proptypes from 'prop-types'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenCreator = { display: props.user.username === props.blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title}
        <> </>
        {props.blog.author}
        <button id={'view'+props.user.name}style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>
          {props.blog.url}
        </div>
        <div id='likeamount'>
        likes {props.blog.likes}
          <button id={'likes'+props.user.name} onClick={props.likeBlog}>like</button>
        </div>
        <div>
          {props.blog.user.name}
        </div>
        <div>
          <button style={showWhenCreator} onClick={props.removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired
}

export default Blog