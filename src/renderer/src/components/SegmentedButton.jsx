import PropTypes from 'prop-types'

export default function SegmentedButton({ label, icon, rounded }) {
  let buttonClassName =
    'hover:bg-secondary-light transition-colors border-y border-accent h-10 w-40 flex flex-row justify-center items-center gap-2 px-3 py-2.5'
  if (rounded && rounded.search(/left/)) buttonClassName += ' border-r rounded-r-full'
  if (rounded && rounded.search(/right/)) buttonClassName += ' border-l rounded-l-full'

  return (
    <button className={buttonClassName}>
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  )
}

SegmentedButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  rounded: PropTypes.string
}
