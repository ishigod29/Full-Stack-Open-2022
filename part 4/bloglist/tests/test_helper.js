const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'CSS is easy',
    author: 'Michell Castillo',
    url: 'https://fullstackopen.com/es/part4/estructura_de_la_aplicacion_backend_introduccion_a_las_pruebas',
    likes: 5,
  },
  {
    title: 'JAVSCRIPT best language of the web',
    author: 'Matias Hernandez',
    url: 'https://www.youtube.com/watch?v=UjKgrCZTuXo&list=RDUtmLRT47l1k&index=27',
    likes: 8,
  }
]

const initialUsers = [
  {
    username: 'Johan1020',
    name: 'Johan Liebert',
    password: '123456789'

  },
  {
    username: 'Kiyotaka2826',
    name: 'Kiyotaka Ayanokoji',
    password: '123456789'

  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'I Love Fullstack Open Course', author: 'Michell Castillo', url: 'https://fullstackopen.com/es/part4/porbando_el_backend', likes: 2 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const BlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const UsersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  initialBlogs, initialUsers, nonExistingId, BlogsInDb, UsersInDb
}