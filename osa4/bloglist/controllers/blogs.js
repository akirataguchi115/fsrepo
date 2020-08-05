const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).json(new Blog(request.body))
  } else {
    if (request.body.likes === undefined) {
      request.body.likes = 0
    }
    const blog =  await new Blog(request.body).save()
    response.status(200).json(blog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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