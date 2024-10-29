import styled from '@emotion/styled'
import { ButtonBase, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

ModuleButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  number: PropTypes.number
}

const Badge = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '9999px',
  backgroundColor: theme.palette.surface.main
}))

export default function ModuleButton({ name, icon, isActive = false, onClick, number }) {
  return (
    <ButtonBase
      sx={{
        display: 'flex',
        height: '3.5rem',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        gap: '0.75rem',
        borderRadius: '9999px',
        border: 'none',
        paddingY: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1.5rem',
        transition: 'background-color 0.3s',
        color: 'accent.main',
        backgroundColor: isActive ? 'secondary.main' : 'transparent',
        '&:hover': {
          backgroundColor: !isActive ? 'surface.main' : null
        }
      }}
      onClick={onClick}
    >
      {icon}
      <Typography variant="h3" sx={{ flexGrow: 1, width: '1px', textAlign: 'start' }}>
        {name}
      </Typography>
      {number && (
        <Badge>
          <span>{number}</span>
        </Badge>
      )}
    </ButtonBase>
  )
}
