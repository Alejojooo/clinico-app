export function clean(formData) {
  const newFormData = trim(formData)
  for (const field in formData) {
    const value = newFormData[field]
    if (!value && typeof value !== Boolean) delete newFormData[field]
  }
  return newFormData
}

export function trim(formData) {
  const newFormData = { ...formData }
  for (const field in formData) {
    if (typeof newFormData[field] === 'string') newFormData[field] = newFormData[field].trim()
  }
  return newFormData
}
