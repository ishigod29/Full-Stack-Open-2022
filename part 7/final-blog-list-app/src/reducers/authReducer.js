import { setToken } from '../services/blogs'
import { login } from '../services/login'
import { setNotification } from './notificationReducer'

const authReducer = (state=null, action)  => {

  switch(action.type){
  case 'SAVED_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return action.user
  default :
    return state
  }
}

export const initializeLogin = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setToken(user.token)
    return ({
      type: 'SAVED_USER',
      user: user,
    })
  }

  return {
    type: 'SAVED_USER',
    user:null
  }
}

export const loginUser = (username,password) => {
  return async dispatch => {
    try {
      const user = await login({ username,password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setToken(user.token)
      dispatch({
        type:'LOGIN',
        user: user
      })
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'error', 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT',
      user: null
    })
  }
}

export default authReducer