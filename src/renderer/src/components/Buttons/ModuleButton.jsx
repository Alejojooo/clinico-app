import { ButtonBase, Typography } from '@mui/material'
import PropTypes from 'prop-types'

ModuleButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

export default function ModuleButton({ name, icon, isActive = false, onClick }) {
  return (
    <ButtonBase
      sx={{
        display: 'flex',
        height: '3.5rem',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
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
      <Typography variant="h3">{name}</Typography>
    </ButtonBase>
  )
}
