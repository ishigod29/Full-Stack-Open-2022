import { getAllUsers } from '../services/blogs'

const userReducer = (state=[], action) => {
  switch(action.type){
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch  => {
    const users = await getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer