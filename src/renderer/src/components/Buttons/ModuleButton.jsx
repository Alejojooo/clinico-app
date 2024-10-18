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
        justifyContent: 'flex-start',
        gap: '0.75rem',
        borderRadius: '9999px',
        border: 'none',
        paddingY: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1.5rem',
        transition: 'background-color 0.3s',
        color: 'berkeley-blue.main',
        backgroundColor: isActive ? 'columbia-blue.main' : 'transparent',
        '&:hover': {
          backgroundColor: !isActive ? 'antiflash-white.main' : null
        },
        '&:focus': {
          backgroundColor: 'columbia-blue.main'
        }
      }}
      onClick={onClick}
    >
      {icon}
      <Typography variant="subtitle1" component="h3" sx={{ fontWeight: '500' }}>
        {name}
      </Typography>
    </ButtonBase>
  )
}
