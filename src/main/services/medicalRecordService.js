import { MEDICAL_RECORD_SCHEMA_FIELDS, MedicalRecord } from '../models/MedicalRecord'
import { Patient } from '../models/Patient'
import { cleanData, parseErrors, serialize } from '../utils/form'
import { JSDateToISO } from './dateService'

export async function newMedicalRecord(event, formData) {
  try {
    const medicalRecordData = cleanData(formData, MEDICAL_RECORD_SCHEMA_FIELDS)
    const newMedicalRecord = await MedicalRecord.create(medicalRecordData)
    Patient.findByIdAndUpdate(medicalRecordData.patientId, {
      $push: { medicalRecords: newMedicalRecord._id }
    })
    return { outcome: 'success', payload: toFormData(newMedicalRecord) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function getMedicalRecords(event, patientId) {
  const medicalRecords = await MedicalRecord.find({ patientId: patientId })
    .select('_id date')
    .sort('-date')
  return serialize(
    medicalRecords.map((medicalRecord) => ({
      _id: medicalRecord._id,
      label: JSDateToISO(medicalRecord.date, { includeTime: true, pretty: true })
    }))
  )
}

export async function getMedicalRecordById(event, id) {
  const medicalRecord = await MedicalRecord.findById(id)
  return await toFormData(medicalRecord)
}

export async function updateMedicalRecord(event, id, formData) {
  try {
    const medicalRecordData = cleanData(formData, MEDICAL_RECORD_SCHEMA_FIELDS)
    await MedicalRecord.findByIdAndUpdate(id, medicalRecordData)
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deleteMedicalRecord(event, id) {
  await MedicalRecord.findByIdAndDelete(id)
  await Patient.updateOne({ medicalRecords: id }, { $pull: { medicalRecords: id } })
}

function toFormData(medicalRecord) {
  const newMedicalRecord = serialize(medicalRecord)
  newMedicalRecord.date = JSDateToISO(medicalRecord.date, { includeTime: true })
  return newMedicalRecord
}
