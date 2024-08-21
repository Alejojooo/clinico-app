import PropTypes from 'prop-types'

export default function IconButton({ icon }) {
  return (
    <div className="size-12 flex justify-center items-center">
      <button className="size-10 rounded-full hover:bg-secondary-light p-2 flex justify-center items-center">
        {icon}
      </button>
    </div>
  )
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired
}
