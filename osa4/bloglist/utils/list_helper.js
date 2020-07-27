var _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  var maxBlog
  var maxLikes = 0
  var blog
  for (blog of blogs) {
    if (blog.likes > maxLikes) {
      maxBlog = blog
      maxLikes = blog.likes
    }
  }
  return maxBlog
}

const mostBlogs = (blogs) => {
  var pHolder = _(blogs)
    .groupBy('author')
    .map((items, author) => ({ author, blogs: items.length }))
    .value()
  var result = _.maxBy(pHolder, 'blogs')
  return result
}

const mostLikes = (blogs) => {
  var pHolder = _(blogs)
    .groupBy('author')
    .map((items, author) => {
      return ({ author, likes: totalLikes(items) })
    })
    .value()
  var result = _.maxBy(pHolder, 'likes')
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}