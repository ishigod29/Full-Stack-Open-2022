import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Collapse = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.firstLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>{props.secondLabel}</button>
        {props.children}
      </div>
    </div>
  )
}

Collapse.propTypes = {
  firstLabel: PropTypes.string.isRequired,
  secondLabel: PropTypes.string.isRequired,
}

export default Collapse
