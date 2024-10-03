import PropTypes from 'prop-types'

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  solid: PropTypes.bool
}

export default function IconButton({ icon, onClick, solid = false }) {
  return (
    <div className="flex size-12 items-center justify-center">
      <button
        type="button"
        className={`flex size-10 items-center justify-center rounded-full p-2 transition-colors hover:bg-secondary-light ${solid ? 'bg-primary drop-shadow-md' : ''}`}
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  )
}
