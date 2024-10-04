import { MedicalRecord } from '../models/MedicalRecord'
import { Patient, PATIENT_SCHEMA_FIELDS } from '../models/Patient'
import { formToEntity, parseErrors, serialize } from '../utils/form'
import { JSDateToISO } from './dateService'
import { deleteImage, getImage, saveImage } from './imageService'

export async function newPatient(event, formData) {
  try {
    const patientData = formToEntity(formData, PATIENT_SCHEMA_FIELDS)
    const newPatient = await Patient.create(patientData)
    await saveImage(formData.image, 'Patient', newPatient._id)
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
    const patientData = formToEntity(formData, PATIENT_SCHEMA_FIELDS)
    await Patient.findByIdAndUpdate(id, patientData, { runValidators: true })
    if (formData.image) await saveImage(formData.image, 'Patient', id)
    else await deleteImage('Patient', id)
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deletePatient(event, id) {
  await Patient.findByIdAndDelete(id)
  await deleteImage('Patient', id)
  await MedicalRecord.deleteMany({ patientId: id })
}

async function toFormData(patient) {
  const patientData = serialize(patient)
  patientData.birthdate = JSDateToISO(patient.birthdate)
  patientData.image = (await getImage('Patient', patientData._id)) ?? ''
  return patientData
}
