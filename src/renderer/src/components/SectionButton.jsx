import PropTypes from 'prop-types'

SegmentedButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  rounded: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

export default function SegmentedButton({ label, icon, rounded, isActive = false, onClick }) {
  return (
    <button
      className={`flex h-10 w-40 flex-row items-center justify-center gap-2 overflow-visible border-y border-accent px-3 py-2.5 transition-colors hover:bg-secondary-light focus:bg-tertiary ${rounded === 'left' ? 'rounded-l-full border-l' : rounded === 'right' ? 'rounded-r-full border-r' : ''} ${isActive ? 'bg-tertiary' : ''}`}
      onClick={(event) => {
        event.target.blur()
        onClick()
      }}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  )
}
