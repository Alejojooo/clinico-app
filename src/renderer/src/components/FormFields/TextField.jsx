import PropTypes from 'prop-types'

SimpleTextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  labelWidth: PropTypes.string,
  fieldId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  gap: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  hidden: PropTypes.bool
}

export function SimpleTextField({
  type = 'text',
  label,
  labelWidth = '',
  fieldId,
  width = 'grow',
  height = '',
  gap = 'gap-2.5',
  value,
  onChange,
  readOnly = false,
  hidden = false
}) {
  return (
    <div
      className={`flex flex-row items-center text-accent ${gap} ${height} ${width === 'grow' ? 'grow' : ''} ${hidden ? 'hidden' : 'block'}`}
    >
      <label htmlFor={fieldId} className={`text-sm font-semibold ${labelWidth}`}>
        {label}
      </label>
      <input
        type={type}
        id={fieldId}
        name={fieldId}
        className={`rounded-md border border-neutral bg-transparent px-2.5 py-1 outline-none ${width === 'grow' ? 'text-start' : 'text-center'} text-sm ${width}`}
        value={value}
        onChange={onChange}
        disabled={readOnly}
      />
    </div>
  )
}

TextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  fieldId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool
}

export function TextField({
  type = 'text',
  label,
  fieldId,
  width = 'w-24',
  height = 'h-14',
  value,
  error,
  onChange,
  readOnly = false,
  multiline = false
}) {
  if (type !== 'text' && multiline)
    throw new Error('TextField has to be of type text to be multiline')
  return (
    <div
      className={`relative mt-2 py-2 ${type.startsWith('date') ? 'px-4' : 'pl-4'} ${error ? 'mb-3 border-error text-error' : 'border-neutral text-accent'} ${width} ${height} rounded border`}
    >
      <label
        className="absolute -top-2.5 left-3 h-fit w-fit bg-primary px-1 text-xs"
        htmlFor={fieldId}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          className="size-full resize-none bg-transparent py-1 outline-none"
          name={fieldId}
          rows="1"
          value={value}
          onChange={onChange}
          disabled={readOnly}
        ></textarea>
      ) : (
        <input
          id={fieldId}
          className="size-full bg-transparent py-1 outline-none"
          name={fieldId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={readOnly}
        />
      )}
      {error && <span className="absolute -bottom-4 left-3 px-1 text-xs">{error}</span>}
    </div>
  )
}
