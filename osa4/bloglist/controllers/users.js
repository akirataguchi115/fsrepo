const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.username === undefined || body.password === undefined || body.password.length < 4) {
    return response.status(400).json({
      error: 'invalid user information'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    return response.status(400).json({
      error: 'invalid user information'
    })
  }
})

module.exports = usersRouter