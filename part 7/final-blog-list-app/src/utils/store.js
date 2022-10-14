import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from '../reducers/blogReducer'
import authReducer from '../reducers/authReducer'
import notificationReducer from '../reducers/notificationReducer'
import commentReducer from '../reducers/commentReducer'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  comments: commentReducer,
  users: userReducer,
  auth: authReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store