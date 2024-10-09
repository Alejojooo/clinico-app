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
      className={`flex ${verticalLayout ? 'h-fit flex-col rounded-lg px-4' : `h-10 flex-row rounded-full ${icon ? 'pl-4 pr-5' : 'px-4'}`} items-center justify-center gap-2 ${disabled ? 'bg-disabled text-disabled-accent' : 'bg-primary drop-shadow-md hover:drop-shadow-lg'} py-2.5 transition-colors hover:bg-secondary-light focus:bg-tertiary`}
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
