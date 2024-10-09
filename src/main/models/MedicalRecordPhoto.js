import { model, models, Query, Schema } from 'mongoose'

export const SCHEMA_FIELDS = ['description', 'medicalRecordId']

const medicalRecordPhotoSchema = new Schema({
  image: { type: Schema.Types.ObjectId, required: true },
  description: {
    type: String,
    required: [true, 'Ingrese una descripción para la imagen'],
    unique: true,
    validate: {
      validator: async function (value) {
        const photo = await models.MedicalRecordPhoto.findOne({ description: value }).select(
          '_id description'
        )
        if (!photo) return true
        if (this instanceof Query) {
          return photo._id.toString() === this.getQuery()._id.toString()
        } else {
          return photo._id.toString() === this._id.toString()
        }
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
