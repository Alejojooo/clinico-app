import PropTypes from 'prop-types'

export default function FormField({ label, name, cssWidth = 'flex-grow', cssHeight = 'h-14' }) {
  const divClassName = `relative border border-neutral rounded-md pl-4 py-2 ${cssWidth} ${cssHeight}`

  return (
    <div className={divClassName}>
      <label
        className="bg-primary w-fit h-fit absolute left-3 -top-2.5 px-1 text-xs text-accent"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className="bg-transparent size-full py-1 text-accent"
        name={name}
        type="text"
      />
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cssWidth: PropTypes.string,
  cssHeight: PropTypes.string
}
