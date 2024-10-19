import { Appointment, SCHEMA_FIELDS } from '../models/Appointment'
import { Patient } from '../models/Patient'
import { formatDate } from '../utils/date'
import { cleanData, parseErrors, serialize } from '../utils/form'

export async function newAppointment(event, formData) {
  try {
    const data = cleanData(formData, SCHEMA_FIELDS)
    const newAppointment = await Appointment.create(data)
    return { outcome: 'success', payload: await toFormData(newAppointment) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function getAppointmentsByDate(event, date) {
  if (typeof date !== 'string') throw new Error('Invalid date passed to getAppointmentsByDate')
  const startOfDay = new Date(date)
  const endOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  endOfDay.setHours(23, 59, 59, 999)

  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  }).sort('-date')

  return serialize(
    await Promise.all(
      appointments.map(async (appointment) => {
        const patient = await Patient.findById(appointment.patientId).select('-_id name')
        const label = `${formatDate(appointment.date, { onlyTime: true })} - ${patient.name}`
        return {
          _id: appointment._id,
          label: label
        }
      })
    )
  )
}

export async function getAppointmentById(event, id) {
  const appointment = await Appointment.findById(id)
  const formData = await toFormData(appointment)
  return formData
}

export async function getNextPatientAppointment(event, patientId) {
  const today = new Date()

  const appointment = await Appointment.findOne({
    patientId: patientId,
    date: { $gte: today }
  }).sort('-date')
  return appointment ? toFormData(appointment) : null
}

export async function updateAppointment(event, id, formData) {
  try {
    const data = cleanData(formData, SCHEMA_FIELDS)
    const target = await Appointment.findById(id)
    for (const field in data) {
      target[field] = data[field]
    }
    await target.save()
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deleteAppointment(event, id) {
  await Appointment.findByIdAndDelete(id)
}

async function toFormData(entity) {
  const newAppointment = serialize(entity)
  newAppointment.patientName = (
    await Patient.findById(newAppointment.patientId).select('-_id name')
  ).name
  newAppointment.date = formatDate(newAppointment.date, { pretty: true })
  return newAppointment
}
