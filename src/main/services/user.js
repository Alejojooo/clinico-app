import bcrypt from 'bcrypt'
import { SCHEMA_FIELDS, User } from '../models/User'
import { cleanData, parseErrors, serialize } from '../utils/form'

export async function createDefaultAdmin() {
  const existsAdmin = (await User.find({ role: 'A' })).length > 0
  if (!existsAdmin) {
    const admin = new User({
      username: 'admin',
      name: 'admin',
      password: await hashPassword('admin'),
      role: 'A'
    })
    admin.save({ validateBeforeSave: false })
  }
}

class LoginError extends Error {
  constructor(error) {
    super(error.message)
    this.name = error.name
  }
}

export async function login(event, username, password) {
  try {
    if (!username)
      throw new LoginError({ name: 'username', message: 'Ingrese un nombre de usuario' })
    const user = await User.findOne({ username })
    if (!user) {
      throw new LoginError({ name: 'username', message: 'Usuario no encontrado' })
    }

    if (!password) throw new LoginError({ name: 'password', message: 'Ingrese una contraseña' })
    const isMatch = await verifyPassword(password, user.password)
    if (!isMatch) {
      throw new LoginError({ name: 'password', message: 'Contraseña incorrecta' })
    }

    const formData = toFormData(user)
    delete formData.password
    return { outcome: 'success', payload: formData }
  } catch (error) {
    return { outcome: 'failure', payload: { [error.name]: error.message } }
  }
}

export async function newUser(event, formData) {
  let errors = {}
  const userData = cleanData(formData, SCHEMA_FIELDS)

  // Validación de contraseña
  try {
    validatePassword(formData.password, formData.confirmPassword)
    userData.password = await hashPassword(formData.password)
  } catch (err) {
    errors.password = { message: err.message }
  }

  // Validación de los demás campos
  try {
    await User.validate(userData, ['username', 'name', 'role'])
  } catch (err) {
    errors = { ...errors, ...err.errors }
  }

  if (Object.keys(errors) <= 0) {
    const newUser = await User.create(userData)
    return { outcome: 'success', payload: toFormData(newUser) }
  } else {
    return { outcome: 'failure', payload: parseErrors(errors) }
  }
}

export async function getUsers() {
  const users = await User.find({}).sort('username')
  return serialize(users.map((user) => ({ _id: user._id, label: user.username })))
}

export async function getUserById(event, id) {
  const user = await User.findById(id).select('-password')
  const formData = toFormData(user)
  return formData
}

export async function updateUser(event, id, formData) {
  try {
    const userData = cleanData(formData, SCHEMA_FIELDS)
    const targetUser = await User.findById(id)
    for (const field in userData) {
      targetUser[field] = userData[field]
    }
    await targetUser.save()
    return { outcome: 'success', payload: toFormData(targetUser) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err) }
  }
}

export async function updatePassword(event, id, formData) {
  try {
    const { password, confirmPassword } = formData
    validatePassword(password, confirmPassword)

    const targetUser = await User.findById(id)
    targetUser.password = await hashPassword(password)
    await targetUser.save()

    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: { password: err.message } }
  }
}

export async function deleteUser(event, id) {
  await User.findByIdAndDelete(id)
}

async function verifyPassword(enteredPassword, storedHash) {
  const isMatch = await bcrypt.compare(enteredPassword, storedHash)
  return isMatch
}

async function hashPassword(password) {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

function validatePassword(password, confirmPassword) {
  if (!password) throw new Error('La contraseña es requerida')
  if (password !== confirmPassword) throw new Error('Las contraseñas no coinciden')
  if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres')
  else if (!/[A-Z]/.test(password))
    throw new Error('La contraseña debe contener al menos una letra mayúscula')
  else if (!/\d/.test(password)) throw new Error('La contraseña debe contener al menos un número')
  else return true
}

function toFormData(user) {
  const formData = serialize(user)
  delete formData.password
  return formData
}
