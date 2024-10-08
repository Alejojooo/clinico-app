import PropTypes from 'prop-types'

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  verticalLayout: PropTypes.bool,
  disabled: PropTypes.bool
}

export default function ActionButton({ label, icon, onClick, verticalLayout = false, disabled }) {
  return (
    <button
      className={`flex ${verticalLayout ? 'h-fit flex-col rounded-lg px-4' : `h-10 flex-row rounded-full ${icon ? 'pl-4 pr-6' : 'px-4'}`} items-center justify-center gap-2 ${disabled ? 'bg-disabled' : 'bg-primary'} py-2.5 ${!disabled && 'drop-shadow-md'} transition-colors hover:bg-secondary-light ${!disabled && 'hover:drop-shadow-lg'} focus:bg-tertiary ${disabled ? 'text-disabled-accent' : 'text-accent'}`}
      type="button"
      onClick={(event) => {
        event.target.blur()
        onClick()
      }}
      disabled={disabled}
    >
      {icon}
      <span className={`text-sm font-semibold`}>{label}</span>
    </button>
  )
}
