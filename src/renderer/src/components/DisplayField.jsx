import PropTypes from 'prop-types'

DisplayField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.string,
  gap: PropTypes.string.isRequired
}

export default function DisplayField({ label, value, size, gap }) {
  let sizeClass = 'justify-center'
  if (size === 'full') sizeClass = 'justify-start grow'

  let gapClass = 'justify-start gap-2.5'
  if (gap === 'space-between') gapClass = 'justify-between'

  return (
    <div className={`flex flex-row items-center ${gapClass} ${size === 'full' ? 'grow' : ''}`}>
      <span className="text-sm font-semibold">{label}</span>
      <span
        className={`flex flex-row items-center rounded-md border px-2.5 py-1 text-sm ${sizeClass}`}
      >
        {value}
      </span>
    </div>
  )
}
