import { MedicalRecord } from '../models/MedicalRecord'
import { Patient, SCHEMA_FIELDS } from '../models/Patient'
import { cleanData, parseErrors, serialize } from '../utils/form'
import { DateToISO } from './dateService'
import { deleteImage, generateImageHash, getImage, getFilename, saveImage } from './imageService'

export async function newPatient(event, formData) {
  try {
    const patientData = cleanData(formData, SCHEMA_FIELDS)
    patientData.image = await saveImage(formData.image)
    const newPatient = await Patient.create(patientData)
    return { outcome: 'success', payload: await toFormData(newPatient) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function getPatients() {
  const patients = await Patient.find({}).select('_id name').sort('name')
  return serialize(patients.map((patient) => ({ _id: patient._id, label: patient.name })))
}

export async function getPatientById(event, id) {
  const patient = await Patient.findById(id)
  const patientFormData = await toFormData(patient)
  return patientFormData
}

export async function updatePatient(event, id, formData) {
  try {
    const patientData = cleanData(formData, SCHEMA_FIELDS)
    const targetPatient = await Patient.findById(id)
    // Procesar los campos generales
    for (const field in patientData) {
      targetPatient[field] = patientData[field]
    }
    // Procesar la imagen
    if (formData.image) {
      const formDataImageHash = generateImageHash(formData.image)
      const targetPatientImageHash = await getFilename(targetPatient.image)
      if (formDataImageHash !== targetPatientImageHash)
        targetPatient.image = await saveImage(formData.image)
    } else if (targetPatient.image) {
      await deleteImage(targetPatient.image)
      targetPatient.image = null
    }
    // Guardar el registro
    await targetPatient.save()
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deletePatient(event, id) {
  const imageId = serialize(await Patient.findById(id))?.image
  await deleteImage(imageId)
  await Patient.findByIdAndDelete(id)
  await MedicalRecord.deleteMany({ patientId: id })
}

async function toFormData(patient) {
  const patientData = serialize(patient)
  patientData.birthdate = DateToISO(patient.birthdate)
  patientData.image = await getImage(patient.image)
  return patientData
}
