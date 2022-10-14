import { createComment, getAllComments } from '../services/blogs'
import { setNotification } from './notificationReducer'

const commentReducer = (state=[], action) => {

  switch (action.type){
  case 'INIT_COMMENTS':
    return action.data
  case 'NEW_COMMENT':
    return [...state, action.data]
  default:
    return state
  }
}

export const initializeComments = (id) => {
  return async dispatch => {
    const comments = await getAllComments(id)
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments
    })
  }
}

export const createNewComment = (comment,id) => {
  return async dispatch => {
    try {
      const newObject = { comment }
      const newComment = await createComment(newObject,id)
      dispatch({
        type: 'NEW_COMMENT',
        data: newComment
      })
    } catch (exception) {
      dispatch(setNotification('sorry, try again'))
    }
  }
}

export default commentReducer