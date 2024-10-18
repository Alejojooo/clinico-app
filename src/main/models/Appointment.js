import { model, Schema } from 'mongoose'

export const SCHEMA_FIELDS = ['patientId', 'date', 'reason']

const appointmentSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Seleccione un paciente']
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida']
  },
  reason: {
    type: String,
    required: [true, 'Escriba un motivo de consulta']
  }
})

export const Appointment = model('Appointment', appointmentSchema)
