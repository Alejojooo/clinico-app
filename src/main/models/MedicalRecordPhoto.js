import { model, models, Schema } from 'mongoose'
import { validateUniqueness } from './Validator'

export const SCHEMA_FIELDS = ['description', 'medicalRecordId']

const medicalRecordPhotoSchema = new Schema({
  image: { type: Schema.Types.ObjectId },
  description: {
    type: String,
    required: [true, 'Ingrese una descripción para la imagen'],
    unique: true,
    validate: {
      validator: async function (value) {
        return await validateUniqueness(this, models.MedicalRecordPhoto, 'description', value)
      },
      message: 'Ingrese una descripción única para la imagen'
    }
  },
  medicalRecordId: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalRecord',
    required: true
  }
})

export const MedicalRecordPhoto = model('MedicalRecordPhoto', medicalRecordPhotoSchema)
