const lodash = require('lodash')

const dummy = (blogs) => {
  if(blogs){
    return 1
  }else{
    return 1
  }
}

const totalLikes = (blog) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blog.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const singleBlog = blogs[likes.indexOf(Math.max(...likes))]

  return singleBlog
}

const mostBlogAuthor = (blogs) => {
  const author = lodash.countBy(blogs, 'author')
  const maxValue = Math.max(...Object.values(author))
  const maxIndex = Object.keys(author).find(key => author[key] === maxValue)

  return {
    author: maxIndex,
    blogs: maxValue,
  }

}

const mostLikes = (blogs) => {
  let authorLikes = {}

  blogs.forEach(blog => {
    if(blog.author in authorLikes){
      authorLikes[blog.author] += blog.likes
    }else{
      authorLikes[blog.author] = blog.likes
    }
  })
  const maxValue = Math.max(...Object.values(authorLikes))
  const maxIndex = Object.keys(authorLikes).find(key => authorLikes[key] === maxValue)

  return {
    author: maxIndex,
    likes: maxValue
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogAuthor,
  mostLikes
}