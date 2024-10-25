export function cleanData(formData, requiredFields, opts = {}) {
  const newData = { ...formData }
  for (const field in formData) {
    const requiredField = requiredFields.includes(field)
    if (!requiredField) delete newData[field]
    if (!newData[field] && opts?.deleteBlankValues) delete newData[field]
  }
  return newData
}

export function serialize(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function parseErrors(errors) {
  const newErrors = {}
  for (const name in errors) {
    newErrors[name] = errors[name].message
  }
  return newErrors
}
