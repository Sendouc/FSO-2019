import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const form = { type, value, onChange }

  const reset = () => {
    setValue('')
  }

  return {
    form,
    reset
  }
}

export default useField