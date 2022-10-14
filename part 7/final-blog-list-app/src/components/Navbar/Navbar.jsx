import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../reducers/authReducer'
import { InfoText, Menu, Nav, NavLink, NavLogo } from './Navbar.elements'

const Navbar = () => {
  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <Nav>
      <Menu>
        <NavLogo to="/">blog.list</NavLogo>
        <NavLink to="/users">Users</NavLink>
      </Menu>
      <Menu>
        {userAuth ? (
          <InfoText>Welcome {userAuth.username}</InfoText>
        ) : (
          <InfoText>Not account</InfoText>
        )}
        {userAuth ? (
          <NavLink onClick={handleLogout}>Log Out</NavLink>
        ) : (
          <NavLink to="/login">Log In</NavLink>
        )}
      </Menu>
    </Nav>
  )
}

export default Navbar
