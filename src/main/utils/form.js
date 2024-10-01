import { ISOToJSDate } from '../services/dateService'

export function formToEntity(formData, requiredFields) {
  const newData = { ...formData }
  for (const field in formData) {
    if (!requiredFields.includes(field)) delete newData[field]
    else {
      const isDate = ISOToJSDate(formData[field])
      if (isDate) newData[field] = isDate
    }
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
