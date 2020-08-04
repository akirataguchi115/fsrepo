const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    url: 'https://www.amazon.com/Steve-Jobs-Walter-Isaacson/dp/1451648537',
    likes: 6
  },
  {
    title: 'Nalle Puh',
    author: 'A. A. Milne',
    url: 'https://www.adlibris.com/fi/kirja/nalle-puh-maailman-paras-karhu---kirja-jossa-koemme-nalle-puhin-seurassa-seikkailujen-vuoden-puolen-hehtaarin-puistossa-9789510423004',
    likes: 6
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'Nalle Puh'
  )
})

test('identifying field is id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Nalle Puh kerää verorahoja',
    author: 'A. A. Milne',
    url: 'https://www.adlibris.com/fi/kirja/nalle-puh-maailman-paras-karhu---kirja-jossa-koemme-nalle-puhin-seurassa-seikkailujen-vuoden-puolen-hehtaarin-puistossa-9789510423004',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Nalle Puh kerää verorahoja'
  )
})

test('null likes becomes 0 likes', async() => {
  const newBlog = {
    title: 'Nalle Puh tappaa Risto Reippaan',
    author: 'A. A. Milne',
    url: 'https://mvlehti.net/'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)

  const contents = await (await api.get('/api/blogs')).body.map(r => r.likes)
  expect(contents).toContain(0)
})

afterAll(() => {
  mongoose.connection.close()
})