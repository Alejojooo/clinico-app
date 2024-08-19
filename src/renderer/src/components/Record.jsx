import PropTypes from 'prop-types'

export default function Record({ name }) {
  return (
    <button className="w-full h-8 px-4 flex flex-row justify-start items-center">
      <span className="text-base">{name}</span>
    </button>
  )
}

Record.propTypes = {
  name: PropTypes.string
}
