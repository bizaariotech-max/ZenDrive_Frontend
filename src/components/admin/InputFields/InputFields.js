import { TextField } from '@mui/material'
import React from 'react'

const TextInput = (
  {
    value,
    placeholder,
    onChange,
    InputProps,
    sx,
    size
  }
) => {
  return (
    <>
       <TextField
            size={size}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            InputProps={ InputProps}
            sx={sx}
          />
    </>
  )
}

export default TextInput
