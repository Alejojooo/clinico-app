import PropTypes from 'prop-types'

export default function FormField({
  label,
  name,
  cssWidth = 'flex-grow',
  cssHeight = 'h-14',
  value,
  onChange,
  nonEditable = false,
  multiline = false
}) {
  const divClassName = `relative pl-4 py-2 ${cssWidth} ${cssHeight} border border-neutral rounded-md`

  return (
    <div className={divClassName}>
      <label
        className="absolute left-3 -top-2.5 px-1 w-fit h-fit text-xs text-accent bg-primary"
        htmlFor={name}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          className="py-1 size-full text-accent bg-transparent outline-none resize-none"
          name={name}
          rows="10"
          value={value}
          onChange={onChange}
          disabled={nonEditable}
        ></textarea>
      ) : (
        <input
          id={name}
          className="py-1 size-full text-accent bg-transparent outline-none"
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          disabled={nonEditable}
        />
      )}
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cssWidth: PropTypes.string,
  cssHeight: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  nonEditable: PropTypes.bool,
  multiline: PropTypes.bool
}
