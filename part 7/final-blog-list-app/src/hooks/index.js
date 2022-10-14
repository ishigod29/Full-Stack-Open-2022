import { useState } from 'react'

export const useField = (type,name) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const cleanField = () => {
    setValue('')
  }

  const id = name

  return {
    value,
    type,
    name,
    id,
    onChange,
    cleanField
  }
}