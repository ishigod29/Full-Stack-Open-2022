import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertError } from './Notification.elements'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }

  if (message.type === 'info') {
    return (
      <Alert
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 0 }}
      >
        {message.message}
      </Alert>
    )
  } else if (message.type === 'error') {
    return (
      <AlertError
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 0 }}
      >
        {message.message}
      </AlertError>
    )
  }
}

export default Notification
