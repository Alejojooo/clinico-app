import PropTypes from 'prop-types'

export default function NavigationButton({ name, icon }) {
  return (
    <button className="flex h-14 flex-row items-center justify-start gap-3 rounded-full py-4 pl-4 pr-6 transition-colors hover:bg-secondary-light">
      {icon}
      <h3 className="text-sm font-semibold text-accent">{name}</h3>
    </button>
  )
}

NavigationButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
}
