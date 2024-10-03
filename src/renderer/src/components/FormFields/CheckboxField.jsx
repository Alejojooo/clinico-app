import PropTypes from 'prop-types'

CheckboxField.propTypes = {
  label: PropTypes.string,
  fieldId: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
}

export default function CheckboxField({ label, fieldId, isChecked, onChange }) {
  return (
    <div className="flex flex-row items-center gap-2.5">
      <label className="text-sm font-semibold" htmlFor={fieldId}>
        {label}
      </label>
      <input
        id={fieldId}
        name={fieldId}
        type="checkbox"
        className="size-4"
        checked={isChecked}
        onChange={onChange}
      />
    </div>
  )
}
