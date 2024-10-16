import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

ModuleButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

export default function ModuleButton({ name, icon, isActive = false, onClick }) {
  return (
    <button
      className={`flex h-14 flex-row items-center justify-start gap-3 rounded-full border-none py-4 pl-4 pr-6 transition-colors focus:bg-tertiary ${isActive ? 'bg-tertiary' : 'bg-transparent hover:bg-secondary-light'}`}
      onClick={onClick}
    >
      {icon}
      <Typography variant="subtitle1" component="h3">
        {name}
      </Typography>
    </button>
  )
}
