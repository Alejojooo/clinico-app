import PropTypes from 'prop-types'

export default function Record({ name, isActive, onClick }) {
  return (
    <button
      className={`flex h-7 w-full flex-row items-center justify-start px-4 hover:bg-secondary focus:bg-tertiary ${isActive ? 'bg-tertiary' : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

Record.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}
