import PropTypes from 'prop-types'

export default function IconButton({ icon }) {
  return (
    <div className="flex size-12 items-center justify-center">
      <button className="flex size-10 items-center justify-center rounded-full p-2 hover:bg-secondary-light">
        {icon}
      </button>
    </div>
  )
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired
}
