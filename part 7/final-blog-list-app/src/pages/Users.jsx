import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SubTitle, Table, UsersContainer } from '../styles/Users.elements'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <UsersContainer>
      <SubTitle>Users</SubTitle>
      <Table>
        <thead>
          <tr><th>users</th><th>blogs created</th></tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={String(user.id)}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </UsersContainer>
  )
}

export default Users
