import { Patient } from '../models/Patient'
import { saveImage, deleteImage, getImage } from './imageService'
import { localeFormatToJSDate, JSDateToLocaleFormat } from './dateService'
import { trimFormData } from './utils'

export async function newPatient(event, formData) {
  const formErrors = await validate(formData)
  if (Object.keys(formErrors).length === 0) {
    const patientData = toEntityData(formData)
    const newPatient = await Patient.create(patientData)
    await saveImage(formData.image, 'Patient', newPatient._id)
    return [await toFormData(newPatient), formErrors]
  }
  return [null, formErrors]
}

export async function getPatients() {
  const patients = await Patient.find({}, { _id: 1, name: 1 }).sort('name')
  return JSON.parse(JSON.stringify(patients))
}

export async function getPatientById(event, id) {
  const patient = await Patient.findById(id)
  const patientFormData = await toFormData(patient)
  return patientFormData
}

export async function updatePatient(event, id, formData) {
  const formErrors = await validate(formData, false)
  if (Object.keys(formErrors).length === 0) {
    const patient = toEntityData(formData)
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
    if (formData.image) await saveImage(formData.image, 'Patient', id)
    else await deleteImage('Patient', id)
  }
  return formErrors
}

export async function deletePatient(event, id) {
  await Patient.findByIdAndDelete(id)
  await deleteImage('Patient', id)
}

function toEntityData(formData) {
  const patientData = trimFormData(formData)
  patientData.birthdate = localeFormatToJSDate(patientData.birthdate)

  delete patientData.age
  delete patientData.image
  return patientData
}

async function toFormData(patient) {
  const newPatient = JSON.parse(JSON.stringify(patient))
  newPatient.birthdate = JSDateToLocaleFormat(patient.birthdate)

  newPatient.image = (await getImage('Patient', newPatient._id)) ?? ''
  return newPatient
}

async function validate(formData, validateUniqueness = true) {
  const formErrors = {}
  for (const field in formData) {
    let error
    switch (field) {
      case 'name':
        error = await validateName(formData[field], validateUniqueness)
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

async function validateName(value, validateUniqueness) {
  if (!value) return 'El nombre es requerido'
  if (validateUniqueness && (await Patient.findOne({ name: value }).lean()))
    return 'El nombre del paciente ya existe'
  return null
}

function validateGender(value) {
  if (!['M', 'F'].includes(value.toUpperCase())) return 'M/F'
  return null
}

function validateMaritalStatus(value) {
  if (!['S', 'C', 'D', 'V', 'U'].includes(value.toUpperCase())) return 'S/C/D/V/U'
  return null
}

function validateBirthdate(value) {
  if (value === '') return null
  if (!localeFormatToJSDate(value)) return 'La fecha no es válida'
  return null
}

function validateId(value) {
  if (value === '') return null
  const found = value.match(/[A-Z0-9]+/)
  if (!found) return 'El valor debe contener letras o números'
  return null
}
