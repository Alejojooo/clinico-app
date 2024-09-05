import { DateTime } from 'luxon'
import Patient from '../models/Patient'

export async function newPatient(event, args) {
  const formErrors = validate(args)
  if (Object.keys(formErrors).length === 0) {
    const patient = new Patient(curateFormData(args))
    const patientSaved = await patient.save()
    console.log(patientSaved)
  }
  return formErrors
}

function validate(formData) {
  const formErrors = {}
  Object.keys(formData).forEach((field) => {
    let error
    // Validaciones
    if (field === 'name') error = validateName(formData[field])
    else if (field === 'gender') error = validateGender(formData[field])
    else if (field === 'maritalStatus') error = validateMaritalStatus(formData[field])
    else if (field === 'birthdate') error = validateBirthdate(formData[field])
    else if (field === 'id') error = validateId(formData[field])

    if (error) formErrors[field] = error
  })
  return formErrors
}

function validateName(value) {
  if (!value) return 'El nombre es requerido'
  return undefined
}

function validateGender(value) {
  if (!['M', 'F'].includes(value.toUpperCase())) return 'M/F'
  return undefined
}

function validateMaritalStatus(value) {
  if (!['S', 'C', 'D', 'V', 'U'].includes(value.toUpperCase())) return 'S/C/D/V/U'
  return undefined
}

function validateBirthdate(value) {
  if (value === '') return undefined
  const date = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
  if (!date.isValid) return 'La fecha no es válida'
  return undefined
}

function validateId(value) {
  if (value === '') return undefined
  const found = value.match(/[A-Z0-9]+/)
  if (!found) return 'El valor debe contener letras o números'
  return undefined
}

function curateFormData(formData) {
  const newFormData = { ...formData }
  delete newFormData.age
  const birthdate = DateTime.fromFormat(newFormData.birthdate, 'D', { locale: 'es-GT' }).toJSDate()
  newFormData.birthdate = birthdate
  return newFormData
}
