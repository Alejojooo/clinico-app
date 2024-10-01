import mongoose, { model, Schema } from 'mongoose'
import { ISOToJSDate } from '../services/dateService'

export const PATIENT_SCHEMA_FIELDS = [
  'name',
  'gender',
  'maritalStatus',
  'birthdate',
  'id',
  'insurance',
  'email',
  'home',
  'phone',
  'otherData'
]

const patientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
    validate: {
      validator: async (value) => {
        const patient = await mongoose.models.Patient.findOne({ name: value }).select('_id name')
        // `this` hace referencia al documento actual
        // Si se encuentra un paciente con el mismo nombre y no es el mismo documento, retornar false
        return !patient || patient._id.toString() === this._id.toString()
      },
      message: 'El nombre del paciente ya existe'
    }
  },
  gender: {
    type: String,
    enum: {
      values: ['M', 'F'],
      message: 'M/F'
    },
    required: [true, 'M/F']
  },
  maritalStatus: {
    type: String,
    enum: {
      values: ['S', 'C', 'D', 'V', 'U'],
      message: 'S/C/D/V/U'
    },
    required: [true, 'S/C/D/V/U']
  },
  birthdate: {
    type: Date,
    validate: {
      validator: (value) => value !== null || ISOToJSDate(value) !== null,
      message: 'La fecha no es válida'
    },
    default: null
  },
  id: {
    type: String,
    match: [/[A-Z0-9]+/, 'El valor debe contener letras o números'],
    default: ''
  },
  insurance: { type: String, default: '' },
  email: { type: String, default: '' },
  home: { type: String, default: '' },
  phone: { type: String, default: '' },
  otherData: { type: String, default: '' },
  medicalRecords: [{ type: Schema.Types.ObjectId, ref: 'MedicalRecord' }]
})

export const Patient = model('Patient', patientSchema)
