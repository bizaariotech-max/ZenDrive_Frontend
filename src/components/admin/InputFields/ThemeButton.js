import { Button } from '@mui/material'
import React from 'react'

const ThemeButton = ({ className,  variant, sx, onClick, value, endIcon }) => {
  return (
    <>
      <Button
        className={className}
        variant={variant}
        sx={sx}
        onClick={onClick}
        endIcon={endIcon}
      >
        {value}
      </Button>
    </>
  )
}

export default ThemeButton

