import { DateTime } from 'luxon'
import Patient from '../models/Patient'

export async function newPatient(event, formData) {
  const formErrors = validate(formData)
  if (Object.keys(formErrors).length === 0) {
    // La última validación es con la DB (el nombre es único?)
    const uniqueNameError = await createPatient(formData)
    if (uniqueNameError) formErrors.name = uniqueNameError
  }
  return formErrors
}

async function createPatient(formData) {
  try {
    await Patient.create(curateFormData(formData))
  } catch (error) {
    if (error.code === 11000) return 'El nombre del paciente ya existe'
    return undefined
  }
}

export async function getPatientById(event, id) {
  const patient = await Patient.findById(id)
  const patientParsed = JSON.parse(JSON.stringify(patient))
  patientParsed.birthdate = DateTime.fromJSDate(patient.birthdate).toFormat('D', {
    locale: 'es-GT'
  })
  return patientParsed
}

export async function getPatients() {
  const patients = await Patient.find({}, { _id: 1, name: 1 })
  return JSON.parse(JSON.stringify(patients))
}

export async function updatePatient(event, formData) {
  const formErrors = validate(formData)
  if (Object.keys(formErrors).length === 0) {
    const _formData = curateFormData(formData)
    await Patient.findByIdAndUpdate(_formData._id, {
      name: _formData.name,
      gender: _formData.gender,
      maritalStatus: _formData.maritalStatus,
      birthdate: _formData.birthdate,
      id: _formData.id,
      insurance: _formData.insurance,
      email: _formData.email,
      home: _formData.home,
      phone: _formData.phone,
      otherData: _formData.otherData
    })
  }
  return formErrors
}

function validate(formData) {
  const formErrors = {}
  Object.keys(formData).forEach((field) => {
    let error
    switch (field) {
      case 'name':
        error = validateName(formData[field])
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
