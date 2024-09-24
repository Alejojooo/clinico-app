import PropTypes from 'prop-types'

// TODO: Probar a quitarle el fieldId a age
// TODO: Probar a cambiar el type="date" para birthdate

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string
}

export function CheckboxField({ label, fieldId }) {
  return (
    <div className="flex flex-row items-center gap-2.5">
      <label className="text-sm font-semibold" htmlFor={fieldId}>
        {label}
      </label>
      <input id={fieldId} type="checkbox" className="size-4" />
    </div>
  )
}

SimpleTextField.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.string,
  fieldId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  gap: PropTypes.string,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
}

export function SimpleTextField({
  label,
  labelWidth = '',
  fieldId,
  width = 'grow',
  height = '',
  gap = 'gap-2.5',
  value,
  readOnly = false
}) {
  return (
    <div
      className={`flex flex-row items-center ${gap} ${height} ${width === 'grow' ? 'grow' : ''}`}
    >
      <label htmlFor={fieldId} className={`text-sm font-semibold ${labelWidth}`}>
        {label}
      </label>
      <input
        id={fieldId}
        name={readOnly ? fieldId : ''}
        type="text"
        className={`rounded-md border bg-transparent px-2.5 py-1 outline-none ${width === 'grow' ? 'text-start' : 'text-center'} text-sm ${width}`}
        value={value}
        disabled={readOnly}
      />
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool
}

export function TextField({
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
  return (
    <div
      className={`relative mt-2 py-2 pl-4 ${error ? 'mb-3 border-error text-error' : 'border-neutral text-accent'} ${width} ${height} rounded border`}
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
          rows="10"
          value={value}
          onChange={onChange}
          disabled={readOnly}
        ></textarea>
      ) : (
        <input
          id={fieldId}
          className="size-full bg-transparent py-1 outline-none"
          name={fieldId}
          type="text"
          value={value}
          onChange={onChange}
          disabled={readOnly}
        />
      )}
      {error && <span className="absolute -bottom-4 left-3 px-1 text-xs">{error}</span>}
    </div>
  )
}
