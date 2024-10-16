import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

SegmentedButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  rounded: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default function SegmentedButton({
  className,
  label,
  icon,
  rounded,
  isActive = false,
  onClick,
  disabled
}) {
  return (
    <button
      className={`${className} flex h-10 w-40 flex-row items-center justify-center gap-2 overflow-visible border-y border-neutral px-3 py-2.5 transition-colors ${disabled ? 'bg-disabled text-disabled-accent' : 'bg-primary hover:bg-secondary-light'} focus:bg-tertiary ${rounded === 'left' ? 'rounded-l-full border-l' : rounded === 'right' ? 'rounded-r-full border-r' : ''} ${isActive ? 'bg-tertiary' : ''}`}
      onClick={(event) => {
        event.target.blur()
        onClick()
      }}
      disabled={disabled}
    >
      {icon}
      <Typography variant="button" component="span">
        {label}
      </Typography>
      {/* <span className="text-sm font-normal">{label}</span> */}
    </button>
  )
}
