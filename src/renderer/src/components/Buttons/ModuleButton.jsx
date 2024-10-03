import PropTypes from 'prop-types'

ModuleButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

export default function ModuleButton({ name, icon, isActive = false, onClick }) {
  return (
    <button
      className={`flex h-14 flex-row items-center justify-start gap-3 rounded-full py-4 pl-4 pr-6 transition-colors hover:bg-secondary-light focus:bg-tertiary ${isActive ? 'bg-tertiary' : ''}`}
      onClick={onClick}
    >
      {icon}
      <h3 className="text-sm font-semibold text-accent">{name}</h3>
    </button>
  )
}
