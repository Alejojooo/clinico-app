import styled from '@emotion/styled'
import { TextField } from '@mui/material'

const SmallTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '2.5rem',
    fontSize: '1rem'
  },
  '& .MuiInputBase-input': {
    padding: '8.5px 14px'
  },
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
    transform: 'translate(14px, 8px) scale(1)'
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -8px) scale(0.75)'
  }
})

export default SmallTextField
