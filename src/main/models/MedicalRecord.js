import { model, Schema } from 'mongoose'

export const MEDICAL_RECORD_SCHEMA_FIELDS = [
  'date',
  'firstTime',
  'record',
  'diagnosis',
  'treatment',
  'patientId'
]

const medicalRecordSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  firstTime: {
    type: Boolean,
    default: false
  },
  record: { type: String, default: 'No registrado' },
  diagnosis: { type: String, default: 'En estudio' },
  treatment: { type: String, default: 'No anotado' },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  photos: [{ type: Schema.Types.ObjectId }]
})

export const MedicalRecord = model('MedicalRecord', medicalRecordSchema)
