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

export async function getPatientById(event, args) {
  const patient = await Patient.findById(args)
  return patient
}

export async function getPatients() {
  const patients = await Patient.find({}, { _id: 1, name: 1 })
  return patients
}

function validate(formData) {
  const formErrors = {}
  Object.keys(formData).forEach((field) => {
    switch (field) {
      case 'name':
        formErrors[field] = validateName(formData[field])
        break
      case 'gender':
        formErrors[field] = validateGender(formData[field])
        break
      case 'maritalStatus':
        formErrors[field] = validateMaritalStatus(formData[field])
        break
      case 'birthdate':
        formErrors[field] = validateBirthdate(formData[field])
        break
      case 'id':
        formErrors[field] = validateId(formData[field])
        break
    }
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
