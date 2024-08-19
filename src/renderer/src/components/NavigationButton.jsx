import PropTypes from 'prop-types'

export default function NavigationButton({ name, icon }) {
  return (
    <button className="rounded-full h-14 pl-4 pr-6 py-4 flex flex-row justify-start items-center gap-3">
      {icon}
      <h3 className="text-sm font-semibold">{name}</h3>
    </button>
  )
}

NavigationButton.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.element
}
