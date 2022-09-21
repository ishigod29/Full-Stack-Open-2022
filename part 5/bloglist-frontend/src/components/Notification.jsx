import React from 'react'

const Notification = ({ message }) => {
  if (message.info !== null) {
    return <div className="info">{message.info}</div>
  } else if (message.error !== null) {
    return <div className="error">{message.error}</div>
  }
}

export default Notification
