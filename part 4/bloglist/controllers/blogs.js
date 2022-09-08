const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 } )
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const blog =  await Blog.findById(id)

  response.json(blog)

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.id){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)

  if(blog.user.toString() === decodedToken.id.toString()){
    await Blog.findByIdAndRemove(id)
    user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
    await user.save()
    response.status(200).json({
      info: 'blog deleted'
    })
  }else{
    return response.status(401).json({
      error: 'only the author can delete this blog'
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updateBlog)

})

module.exports = blogsRouter