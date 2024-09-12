import { join } from 'node:path'
import { DateTime } from 'luxon'
import Patient from '../models/Patient'
import { saveImage, loadImage, deleteImage } from './fileSystemService'

export async function newPatient(event, formData) {
  const formErrors = await validate(formData)
  if (Object.keys(formErrors).length === 0) {
    // Se crea el registro en la base de datos.
    const patientData = toEntityData(formData)
    const newPatient = await Patient.create(patientData)
    // Se guarda la imagen en local (y se actualiza la entidad).
    const imagePath = getImagePath(newPatient._id)
    await saveImage(formData.image, imagePath)
    newPatient.image = imagePath
    newPatient.save()

    return [toFormData(newPatient), formErrors]
  }
  return [null, formErrors]
}

export async function getPatients() {
  const patients = await Patient.find({}, { _id: 1, name: 1 }).sort('name')
  return JSON.parse(JSON.stringify(patients))
}

export async function getPatientById(event, id) {
  const patient = await Patient.findById(id)
  const patientFormData = toFormData(patient)
  return patientFormData
}

export async function updatePatient(event, id, formData) {
  const formErrors = await validate(formData, false)
  if (Object.keys(formErrors).length === 0) {
    const patient = toEntityData(formData)
    const imagePath = getImagePath(id)
    await Patient.findByIdAndUpdate(id, {
      name: patient.name,
      gender: patient.gender,
      maritalStatus: patient.maritalStatus,
      birthdate: patient.birthdate,
      id: patient.id,
      image: formData.image ? imagePath : '',
      insurance: patient.insurance,
      email: patient.email,
      home: patient.home,
      phone: patient.phone,
      otherData: patient.otherData
    })
    if (formData.image) await saveImage(formData.image, imagePath)
    else deleteImage(imagePath)
  }
  return formErrors
}

export async function deletePatient(event, id) {
  await Patient.findByIdAndDelete(id)
  deleteImage(getImagePath(id))
}

function toEntityData(formData) {
  const patientData = trimFormData(formData)
  delete patientData.age
  delete patientData.image
  const birthdate = DateTime.fromFormat(patientData.birthdate, 'D', { locale: 'es-GT' })
  patientData.birthdate = birthdate.isValid ? birthdate.toJSDate() : null
  return patientData
}

async function toFormData(patient) {
  const newPatient = JSON.parse(JSON.stringify(patient))
  const birthdate = DateTime.fromISO(newPatient.birthdate)
  newPatient.birthdate = birthdate.isValid ? birthdate.toFormat('D', { locale: 'es-GT' }) : ''
  if (newPatient.image) {
    const image = await loadImage(newPatient.image)
    newPatient.image = image ?? ''
  }
  return newPatient
}

function trimFormData(formData) {
  const newFormData = { ...formData }
  for (const field in formData) {
    if (typeof newFormData[field] === 'string' && field !== 'imageData')
      newFormData[field] = newFormData[field].trim()
  }
  return newFormData
}

function getImagePath(id) {
  return join(__dirname, 'static', 'img', 'patient', `${id}.jpg`)
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
  // Formato válido 'D': dd/mm/yyyy
  const date = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
  if (!date.isValid) return 'La fecha no es válida'
  return null
}

function validateId(value) {
  if (value === '') return null
  const found = value.match(/[A-Z0-9]+/)
  if (!found) return 'El valor debe contener letras o números'
  return null
}
