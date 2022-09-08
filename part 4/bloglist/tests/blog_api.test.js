const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for ( let blog of helper.initialBlogs ) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when some blog are saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('that the unique identifier is called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })
})

describe('when a blog is posted to api', () => {
  let headers
  let userId

  beforeEach( async () => {
    const newUser = {
      username: 'Johan1020',
      name: 'Johan Liebert',
      password: '123456789'
    }

    const savedUser = await api.post('/api/users').send(newUser)

    const user = {
      username: 'Johan1020',
      password: '123456789'
    }

    const result = await api.post('/api/login').send(user)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }

    userId = savedUser.body.id
  })

  test('creating a new blog and ensuring it is saved to the database', async () => {

    const newBlog = {
      title: 'POST new blog test',
      author: 'tester anonimate',
      url: 'https://jestjs.io/docs/expect#tobedefined',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const savedBlog = await Blog.find(newBlog)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(savedBlog).toHaveLength(1)
  })

  test('no send likes by default 0', async () => {

    const newBlog = {
      title: 'without like property',
      author: 'tester anonimate',
      url: 'https://jestjs.io/docs/expect#tobedefined',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[2].likes).toBe(0)
  })

  test('post bad request', async () => {
    const newBlog = {
      author: 'tester anonimate',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(400)
  })

  test('deleted single blog', async () => {

    const newBlog = {
      title: 'Deleted',
      author: 'Saitama',
      url: 'https://www.youtube.com/watch?v=L5skSFHVJHk',
      likes: '8',
      user: userId
    }

    const savedBlog = await api.post('/api/blogs').send(newBlog).set(headers)


    const id = savedBlog.body.id

    await api
      .delete(`/api/blogs/${id}`)
      .set(headers)
      .expect(200)

    const blogsAtEnd = await helper.BlogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length +1 -1)
  })

  test('update single blog', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[1].id

    const updateBlog = {
      likes: 1000
    }

    const updated = await api
      .put(`/api/blogs/${id}`)
      .send(updateBlog)

    expect(updated.body.likes).toBe(1000)
  })

  test('when the token is missing server responds with unauthorized', async () => {

    const newBlog = {
      title: 'POST test unauthorized',
      author: 'tester anonimate',
      url: 'https://jestjs.io/docs/expect#tobedefined',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})