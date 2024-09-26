export function trimFormData(formData) {
  const newFormData = { ...formData }
  for (const field in formData) {
    if (typeof newFormData[field] === 'string' && field !== 'image')
      newFormData[field] = newFormData[field].trim()
  }
  return newFormData
}
