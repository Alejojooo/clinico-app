import { MedicalRecord, SCHEMA_FIELDS } from '../models/MedicalRecord'
import { MedicalRecordPhoto } from '../models/MedicalRecordPhoto'
import { Patient } from '../models/Patient'
import { formatDate, toUIDate } from '../utils/date'
import { cleanData, parseErrors, serialize } from '../utils/form'

export async function newMedicalRecord(event, formData) {
  try {
    const medicalRecordData = cleanData(formData, SCHEMA_FIELDS, { deleteBlankValues: true })
    const newMedicalRecord = await MedicalRecord.create(medicalRecordData)
    await Patient.findByIdAndUpdate(medicalRecordData.patientId, {
      $push: { medicalRecords: newMedicalRecord._id }
    })
    await MedicalRecord.updateMany(
      { patientId: medicalRecordData.patientId },
      { responsibleMedicalStaff: formData.responsibleMedicalStaff }
    )
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
      label: formatDate(medicalRecord.date, { pretty: true })
    }))
  )
}

export async function getMedicalRecordById(event, id) {
  const medicalRecord = await MedicalRecord.findById(id)
  return await toFormData(medicalRecord)
}

export async function updateMedicalRecord(event, id, formData) {
  try {
    const medicalRecordData = cleanData(formData, SCHEMA_FIELDS)
    const targetMedicalRecord = await MedicalRecord.findById(id)

    for (const field in medicalRecordData) {
      targetMedicalRecord[field] = medicalRecordData[field]
    }

    await targetMedicalRecord.save()
    await MedicalRecord.updateMany(
      { patientId: medicalRecordData.patientId },
      { responsibleMedicalStaff: formData.responsibleMedicalStaff }
    )
    return { outcome: 'success', payload: toFormData(targetMedicalRecord) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deleteMedicalRecord(event, id, responsibleMedicalStaff) {
  await MedicalRecordPhoto.deleteMany({ medicalRecordId: id })
  await Patient.updateOne({ medicalRecords: id }, { $pull: { medicalRecords: id } })

  const patientId = await MedicalRecord.findById(id)
  await MedicalRecord.updateMany(
    { patientId: patientId },
    { responsibleMedicalStaff: responsibleMedicalStaff }
  )
  await MedicalRecord.findByIdAndDelete(id)
}

function toFormData(medicalRecord) {
  const newMedicalRecord = serialize(medicalRecord)
  newMedicalRecord.date = toUIDate(medicalRecord.date)
  return newMedicalRecord
}
