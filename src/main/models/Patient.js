import { model, Schema } from 'mongoose'

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  birthdate: Date,
  id: String,
  insurance: String,
  email: String,
  home: String,
  phone: String,
  otherData: String,
  image: String
})

export default model('Patient', patientSchema)
