import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Button, DownIcon, UpIcon } from './Toggable.elements'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <Wrapper style={hideWhenVisible}>
        <Button initial={{ x:0 }} whileHover={{ x:10 }} onClick={toggleVisibility}>{props.buttonLabel} <DownIcon/></Button>
      </Wrapper>
      <Wrapper style={showWhenVisible}>
        {props.children}
        <Button initial={{ x:0 }} whileHover={{ x:10 }} onClick={toggleVisibility}>close <UpIcon/></Button>
      </Wrapper>
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}


export default Togglable
