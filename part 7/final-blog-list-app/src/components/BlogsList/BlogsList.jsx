import React from 'react'
import { useSelector } from 'react-redux'
import { Blogs, Card, GoIcon, BlogLink, SubTitle } from './BlogList.elements'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <Blogs>
      <SubTitle>blogs publications</SubTitle>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => {
          return (
            <Card initial={{ x:0 }} whileHover={{ x:10 }} key={blog.id}>
              <BlogLink to={blog.id}>{blog.title}{' '}<GoIcon/></BlogLink>
            </Card>
          )
        })}
    </Blogs>
  )
}

export default BlogsList
