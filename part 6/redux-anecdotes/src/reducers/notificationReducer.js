const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return action.notification
    case 'HIDE_MESSAGE':
      return null
    default:
      return state
  }
}

const setNotification = (notification) => {
  return {
    type: 'SHOW_MESSAGE',
    notification,
  }
}

const clearNotification = () => ({
  type: 'HIDE_MESSAGE',
})

export const notification = (notification, displayTime) => {
  return async (dispatch) => {
    await dispatch(setNotification(notification))
    setTimeout(async () => await dispatch(clearNotification()), displayTime * 1000)
  }
}

export default notificationReducer
