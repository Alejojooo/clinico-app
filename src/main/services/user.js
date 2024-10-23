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

export async function login(event, username, password) {
  try {
    if (!username) throw new Error('Ingrese un nombre de usuario')
    if (!password) throw new Error('Ingrese una contraseña')

    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const isMatch = await verifyPassword(password, user.password)
    if (!isMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const formData = toFormData(user)
    delete formData.password
    return { outcome: 'success', payload: formData }
  } catch (error) {
    return { outcome: 'failure', payload: error.message }
  }
}

export async function newUser(event, formData) {
  try {
    const userData = cleanData(formData, SCHEMA_FIELDS)
    if (validatePassword(userData.password)) {
      userData.password = await hashPassword(userData.password)
    }

    const newUser = await User.create(userData)
    delete newUser.password
    return { outcome: 'success', payload: toFormData(newUser) }
  } catch (err) {
    return { outcome: 'failure', payload: getErrors(err) }
  }
}

export async function getUsers() {
  const users = await User.find({}).select('_id username').sort('username')
  return serialize(users.map((user) => ({ _id: user._id, label: user.name })))
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
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: getErrors(err) }
  }
}

export async function updatePassword(event, id, formData) {
  try {
    const { newPassword, confirmPassword } = formData
    if (newPassword !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden')
    }
    validatePassword(newPassword)

    const targetUser = await User.findById(id)
    targetUser.password = hashPassword(newPassword)
    targetUser.save()
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: getErrors(err) }
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

function validatePassword(password) {
  if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres')
  else if (!/[A-Z]/.test(password))
    throw new Error('La contraseña debe contener al menos una letra mayúscula')
  else if (!/\d/.test(password)) throw new Error('La contraseña debe contener al menos un número')
  else return true
}

function getErrors(err) {
  const isValidateException = Boolean(err.errors)
  return isValidateException ? parseErrors(err.errors) : { password: err.message }
}

function toFormData(user) {
  return serialize(user)
}
