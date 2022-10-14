
const notificationReducer = (state=null,action) => {

  switch(action.type){
  case 'SHOW_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = (message,type,displayTime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        type
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        data: null
      })
    },displayTime * 1000)
  }
}

export default notificationReducer