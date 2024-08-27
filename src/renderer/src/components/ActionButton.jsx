import PropTypes from 'prop-types'

export default function ActionButton({ label, icon, onClick }) {
  let buttonClassName =
    'flex flex-row justify-center items-center gap-2 py-2.5 h-10 bg-primary hover:bg-secondary-light focus:bg-tertiary rounded-full drop-shadow-md transition-colors pointer-events-auto '
  if (icon) {
    buttonClassName += 'pl-4 pr-6'
  } else {
    buttonClassName += 'px-4'
  }

  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      {icon}
      <span className="text-sm font-semibold text-accent">{label}</span>
    </button>
  )
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func
}
