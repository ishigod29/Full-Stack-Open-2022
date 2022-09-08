const blogs = require('../utils/for_testing')
const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('the sum of all blog likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('Ranking Blogs', () => {

  test('the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('the author with most blogs', () => {
    const result = listHelper.mostBlogAuthor(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

