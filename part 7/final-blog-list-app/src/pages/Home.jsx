import React from 'react'
import BlogsList from '../components/BlogsList/BlogsList'
import BlogsForm from '../components/BlogForm/BlogForm'
import { useSelector } from 'react-redux'

const Home = () => {
  const userAuth = useSelector(state => state.auth)
  const renderBlogForm = userAuth ? <BlogsForm/> : null
  return (
    <>
      {renderBlogForm}
      <BlogsList/>
    </>
  )
}

export default Home