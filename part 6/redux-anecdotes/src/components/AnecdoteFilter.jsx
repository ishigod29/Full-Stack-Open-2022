import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteFilter = (props) => {
  const handleChange = (e) => {
    props.filterChange(e.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterChange: (value) => {
      dispatch(filterChange(value))
    },
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteFilter)
