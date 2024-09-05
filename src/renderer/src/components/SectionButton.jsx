import PropTypes from 'prop-types'

export default function SegmentedButton({ label, icon, rounded, isActive = false, onClick }) {
  return (
    <button
      className={`flex h-10 w-40 flex-row items-center justify-center gap-2 border-y border-accent px-3 py-2.5 transition-colors hover:bg-secondary-light focus:bg-tertiary ${rounded && rounded.search(/left/) ? 'rounded-r-full border-r' : rounded && rounded.search(/right/) ? 'rounded-l-full border-l' : ''} ${isActive ? 'bg-tertiary' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  )
}

SegmentedButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  rounded: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}
