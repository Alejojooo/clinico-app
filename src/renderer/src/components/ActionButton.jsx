import PropTypes from 'prop-types'

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  verticalLayout: PropTypes.bool
}

export default function ActionButton({ label, icon, onClick, verticalLayout = false }) {
  return (
    <button
      className={`flex ${verticalLayout ? 'h-fit flex-col rounded-lg px-4' : `h-10 flex-row rounded-full ${icon ? 'pl-4 pr-6' : 'px-4'}`} items-center justify-center gap-2 bg-primary py-2.5 drop-shadow-md transition-colors hover:bg-secondary-light focus:bg-tertiary`}
      type="button"
      onClick={(event) => {
        event.target.blur()
        onClick()
      }}
    >
      {icon}
      <span className="text-sm font-semibold text-accent">{label}</span>
    </button>
  )
}
