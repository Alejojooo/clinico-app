import PropTypes from 'prop-types'

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func
}

export default function IconButton({ icon, onClick }) {
  return (
    <div className="flex size-12 items-center justify-center">
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-full p-2 hover:bg-secondary-light"
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  )
}
