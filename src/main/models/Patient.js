const { model, Schema } = require('mongoose')

const patientSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
