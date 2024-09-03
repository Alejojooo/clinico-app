import PropTypes from 'prop-types'

export default function Record({ name }) {
  return (
    <button className="flex h-8 w-full flex-row items-center justify-start px-4">
      <span className="text-base">{name}</span>
    </button>
  )
}

Record.propTypes = {
  name: PropTypes.string.isRequired
}
