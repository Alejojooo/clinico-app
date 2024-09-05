import PropTypes from 'prop-types'

export default function FormField({
  label,
  name,
  cssWidth = 'flex-grow',
  cssHeight = 'h-14',
  value,
  error,
  onChange,
  nonEditable = false,
  multiline = false
}) {
  return (
    <div
      className={`relative mt-2 py-2 pl-4 ${error ? 'border-error text-error mb-3' : 'border-neutral text-accent'} ${cssWidth} ${cssHeight} rounded-md border`}
    >
      <label
        className="absolute -top-2.5 left-3 h-fit w-fit bg-primary px-1 text-xs"
        htmlFor={name}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          className="size-full flex-grow resize-none bg-transparent py-1 outline-none"
          name={name}
          rows="10"
          value={value}
          onChange={onChange}
          disabled={nonEditable}
        ></textarea>
      ) : (
        <input
          id={name}
          className="size-full bg-transparent py-1 outline-none"
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          disabled={nonEditable}
        />
      )}
      {error && <span className="absolute -bottom-4 left-3 px-1 text-xs">{error}</span>}
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cssWidth: PropTypes.string,
  cssHeight: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func,
  nonEditable: PropTypes.bool,
  multiline: PropTypes.bool
}
