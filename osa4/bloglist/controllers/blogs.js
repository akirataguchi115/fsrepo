const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).json(new Blog(request.body))
  } else {
    if (request.body.likes === undefined) {
      request.body.likes = 0
    }
    const body = request.body
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog =  await new Blog(blog).save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const requestingUser = await User.findById(decodedToken.id)
  const deletableBlog = await Blog.findById(request.params.id)
  if (requestingUser.id === deletableBlog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.status(200).end()
  } else {
    response.status(400).end()
  }
})
module.exports = blogsRouter