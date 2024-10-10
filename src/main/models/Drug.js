import { model, models, Schema } from 'mongoose'
import { validateUniqueness } from './Validator'

export const SCHEMA_FIELDS = [
  'tradeName',
  'genericName',
  'description',
  'contraindications',
  'presentations',
  'laboratory'
]

const drugSchema = new Schema({
  tradeName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
    validate: {
      validator: async function (value) {
        return await validateUniqueness(this, models.Drug, 'tradeName', value)
      },
      message: 'El nombre ya existe'
    }
  },
  genericName: { type: String, default: '' },
  description: { type: String, default: '' },
  contraindications: { type: String, default: '' },
  presentations: [{ type: String }],
  laboratory: { type: String, default: '' }
})

export const Drug = model('Drug', drugSchema)
