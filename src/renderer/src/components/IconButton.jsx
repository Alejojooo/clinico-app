import PropTypes from 'prop-types'

export default function IconButton({ icon }) {
  return <button className="size-12 p-2 flex flex-row justify-center items-center">{icon}</button>
}

IconButton.propTypes = {
  icon: PropTypes.element
}
