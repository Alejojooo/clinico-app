import styled from '@emotion/styled'
import { Stack } from '@mui/material'

export const BaseSurface = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.surface.main
}))

export const BaseContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: theme.palette.light.main,
  border: 1,
  borderColor: theme.palette.outline.main,
  borderRadius: '0.5rem',
  boxShadow: 'rgba(9, 11, 17, 0.05) 0px 5px 15px 0px, rgba(19, 23, 32, 0.05) 0px 15px 35px -5px',
  color: theme.palette.accent.main
}))
