const dummy = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}