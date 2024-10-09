import PropTypes from 'prop-types'

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  solid: PropTypes.bool,
  noPadding: PropTypes.bool,
  alternative: PropTypes.bool
}

export default function IconButton({
  icon,
  onClick,
  solid = false,
  noPadding = false,
  alternative = false
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className={`flex size-full items-center justify-center rounded-full ${noPadding ? '' : 'p-2'} transition-colors ${alternative ? 'hover:text-accent' : 'hover:bg-secondary-light'} ${solid ? 'bg-primary drop-shadow-md' : ''}`}
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  )
}
