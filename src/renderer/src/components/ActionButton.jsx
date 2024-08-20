import PropTypes from 'prop-types'

export default function ActionButton({ label, icon }) {
  let buttonClassName =
    'bg-primary drop-shadow-md h-10 rounded-full flex flex-row justify-center items-center gap-2 py-2.5 '
  if (icon) {
    buttonClassName += 'pl-4 pr-6'
  } else {
    buttonClassName += 'px-4'
  }

  return (
    <button className={buttonClassName}>
      {icon}
      <span className="text-sm font-semibold text-accent">{label}</span>
    </button>
  )
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element
}
