import { create, getAll, remove, update } from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state=[], action) => {

  switch(action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== String(action.data))
  case 'UPDATE_LIKES': {
    const id = action.data.id
    const updateBlog = state.find((blog) => blog.id === id)
    const changedBlog = {
      ...updateBlog,likes: updateBlog.likes +1
    }
    return state.map((blog) => blog.id !== id ? blog: changedBlog)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch({
      type:'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await create(newObject)
      dispatch({
        type:'NEW_BLOG',
        data: newBlog
      })
    } catch (exception) {
      dispatch(setNotification('sorry could not create the blog', 'error', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch (exception) {
      dispatch(setNotification('sorry could not delete blog', 'error', 5))
    }
  }
}

export const likesBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await update({
        ...blog, likes: blog.likes + 1
      },blog.id)
      dispatch({
        type: 'UPDATE_LIKES',
        data: updatedBlog
      })
    } catch (exception) {
      dispatch(setNotification('sorry, try again'))
    }
  }
}

export default blogReducer