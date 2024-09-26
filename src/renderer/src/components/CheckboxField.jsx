import PropTypes from 'prop-types'

CheckboxField.propTypes = {
  fieldId: PropTypes.string.isRequired
}

export default function CheckboxField({ fieldId }) {
  return (
    <>
      <label className="text-sm font-semibold" htmlFor={fieldId}>
        Primera vez:
      </label>
      <input id={fieldId} type="checkbox" className="size-4" />
    </>
  )
}
