import { model, models, Schema } from 'mongoose'
import { validateUnique } from '../utils/validator'

export const SCHEMA_FIELDS = ['username', 'name', 'password', 'role']

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    unique: true,
    minLength: [5, 'El nombre de usuario debe tener al menos 5 caracteres'],
    maxLength: [20, 'El nombre de usuario no debe tener más debe 20 caracteres'],
    validate: [
      {
        validator: async function (value) {
          return await validateUnique(this, models.User, 'username', value)
        },
        message: 'El nombre de usuario ya existe'
      },
      {
        validator: function (value) {
          return /^[a-zA-Z0-9]+$/.test(value)
        },
        message: 'El nombre de usuario solo puede contener letras y números.'
      }
      // {
      //   validator: function (value) {
      //     return value !== 'admin'
      //   },
      //   message: 'No puedes usar "admin" como nombre de usuario.'
      // }
    ]
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  role: {
    type: String,
    enum: {
      values: ['A', 'C', 'P'],
      message: 'Escoja uno de los niveles disponibles'
    },
    required: [true, 'Escoja uno de los niveles disponibles']
  }
})

export const User = model('User', userSchema)
