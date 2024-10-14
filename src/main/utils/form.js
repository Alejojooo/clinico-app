import dayjs from 'dayjs'
import { formatDate } from './date'

export function cleanData(formData, requiredFields, opts = {}) {
  const newData = { ...formData }
  for (const field in formData) {
    const hasRequiredField = requiredFields.includes(field)
    if (!hasRequiredField) delete newData[field]
    if (!newData[field] && opts?.deleteBlankValues) delete newData[field]
    if (newData[field] instanceof dayjs) newData[field] = formatDate(newData[field])
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
