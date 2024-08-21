import PropTypes from 'prop-types'

export default function NavigationButton({ name, icon }) {
  return (
    <button className="hover:bg-secondary-light transition-colors rounded-full h-14 pl-4 pr-6 py-4 flex flex-row justify-start items-center gap-3">
      {icon}
      <h3 className="text-sm text-accent font-semibold">{name}</h3>
    </button>
  )
}

NavigationButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
}
