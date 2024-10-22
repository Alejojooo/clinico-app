import { model, models, Schema } from 'mongoose'
import { validateUnique } from '../utils/validator'

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    unique: true,
    validate: {
      validator: async function (value) {
        return await validateUnique(this, models.User, 'username', value)
      },
      message: 'El nombre de usuario ya existe'
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    enum: {
      values: ['Administrador', 'Completo', 'Parcial'],
      message: 'Escoja uno de los niveles disponibles'
    },
    required: [true, 'Escoja uno de los niveles disponibles']
  }
})

export const User = model('User', userSchema)
