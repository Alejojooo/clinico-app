import { DateTime } from 'luxon'
import Patient from '../models/Patient'

export async function newPatient(event, formData) {
  const newFormData = trimFormData(formData)
  const formErrors = await validate(newFormData)
  if (Object.keys(formErrors).length === 0) {
    const patient = await Patient.create(patientFormToEntity(newFormData))
    return [patientEntityToForm(patient), formErrors]
  }
  return [undefined, formErrors]
}

export async function getPatients() {
  const patients = await Patient.find({}, { _id: 1, name: 1 }).sort('name')
  return JSON.parse(JSON.stringify(patients))
}

export async function getPatientById(event, id) {
  const patient = await Patient.findById(id)
  return patientEntityToForm(patient)
}

export async function updatePatient(event, id, formData) {
  const newFormData = trimFormData(formData)
  const formErrors = validate(newFormData)
  if (Object.keys(formErrors).length === 0) {
    const patient = patientFormToEntity(newFormData)
    await Patient.findByIdAndUpdate(id, {
      name: patient.name,
      gender: patient.gender,
      maritalStatus: patient.maritalStatus,
      birthdate: patient.birthdate,
      id: patient.id,
      insurance: patient.insurance,
      email: patient.email,
      home: patient.home,
      phone: patient.phone,
      otherData: patient.otherData
    })
  }
  return formErrors
}

export async function deletePatient(event, id) {
  await Patient.findByIdAndDelete(id)
}

function patientFormToEntity(formData) {
  const trimmed = trimFormData(formData)
  delete trimmed.age
  const birthdate = DateTime.fromFormat(trimmed.birthdate, 'D', { locale: 'es-GT' })
  trimmed.birthdate = birthdate.isValid ? birthdate.toJSDate() : null
  return trimmed
}

function trimFormData(formData) {
  const newFormData = { ...formData }
  for (const field in formData) {
    newFormData[field] = newFormData[field].trim()
  }
  return newFormData
}

function patientEntityToForm(patient) {
  const newPatient = JSON.parse(JSON.stringify(patient))
  const birthdate = DateTime.fromISO(newPatient.birthdate)
  newPatient.birthdate = birthdate.isValid ? birthdate.toFormat('D', { locale: 'es-GT' }) : ''
  return newPatient
}

async function validate(formData) {
  const formErrors = {}
  for (const field in formData) {
    let error
    switch (field) {
      case 'name':
        error = await validateName(formData[field])
        break
      case 'gender':
        error = validateGender(formData[field])
        break
      case 'maritalStatus':
        error = validateMaritalStatus(formData[field])
        break
      case 'birthdate':
        error = validateBirthdate(formData[field])
        break
      case 'id':
        error = validateId(formData[field])
        break
    }
    if (error) formErrors[field] = error
  }
  return formErrors
}

async function validateName(value) {
  if (!value) return 'El nombre es requerido'
  if (await Patient.findOne({ name: value }).lean()) return 'El nombre del paciente ya existe'
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
