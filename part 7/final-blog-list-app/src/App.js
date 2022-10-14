import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header  from './containers/Header'
import  Main  from './containers/Main'
import Footer from './containers/Footer'
import Notification from './components/Notification/Notification'
import Users from './pages/Users'
import DetailUser from './pages/DetailUser'
import DetailBlog from './pages/DetailBlog'
import GlobalStyle from './styles/GlobalStyle'
import { initializeLogin } from './reducers/authReducer'
import { Container } from './styles/GlobalStyle'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLogin())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <GlobalStyle/>
      <Notification/>
      <Header/>
      <Main>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/:id" element={<DetailUser/>}/>
          <Route path="/:id" element={<DetailBlog/>}/>
        </Routes>
      </Main>
      <Footer/>
    </Container>
  )
}

export default App
