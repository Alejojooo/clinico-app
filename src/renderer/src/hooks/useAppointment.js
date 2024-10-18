import dayjs from 'dayjs'
import { useState, useEffect, useReducer } from 'react'
import { ACTIONS, appointmentReducer, initialState } from '../reducers/appointment'
import { clean } from '../utils/form'

export default function useAppointment() {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [state, dispatch] = useReducer(appointmentReducer, initialState)
  const [activeAppointment, setActiveAppointment] = useState(null)

  // useEffect(() => {
  //   dispatch({ type: ACTIONS.SET_APPOINTMENT, appointment: activeAppointment })
  // }, [activeAppointment])

  useEffect(() => {
    getAppointments()
  }, [selectedDate])

  useEffect(() => {
    getPatients()
  }, [])

  const getAppointments = async () => {
    const newDate = selectedDate.format()
    const appointments = await window.appointment.getAppointmentsByDate(newDate)
    setAppointments(appointments)
  }

  const getPatients = async () => {
    const patients = await window.patient.getPatients()
    setPatients(patients)
  }

  const handleField = (e) => {
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: e.target })
  }

  const handleSelect = (_, value) => {
    const event = { target: { name: 'patientId', value: value._id } }
    handleField(event)
  }

  const handleDate = (value) => {
    const event = { target: { name: 'date', value: value } }
    handleField(event)
  }

  const handleDateSelection = (value) => {
    setSelectedDate(value)
    setActiveAppointment(null)
  }

  const getCleanForm = () => {
    const newForm = clean(state.formData)
    if (newForm.date && newForm.date instanceof dayjs) newForm.date = newForm.date.format()
    return newForm
  }

  const handleNewAppointment = async () => {
    const { outcome, payload } = await window.appointment.newAppointment(getCleanForm())
    if (outcome === 'success') {
      await getAppointments()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
    }
  }

  const handleDeleteAppointment = async () => {
    const option = await window.dialog.showConfirmDialog(
      'Eliminar cita',
      '¿Está seguro de eliminar esta cita?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActiveAppointment(null)
      await window.appointment.deleteAppointment(activeAppointment._id)
      await getAppointments()
    }
  }

  const handleAppointmentSelection = async (id) => {
    const appointment = await window.appointment.getAppointmentById(id)
    console.log(appointment)
    setActiveAppointment(appointment)
  }

  return {
    formData: state.formData,
    errors: state.errors,
    activeAppointment,
    appointments,
    patients,
    selectedDate,
    handleField,
    handleSelect,
    handleDate,
    handleDateSelection,
    handleNewAppointment,
    handleDeleteAppointment,
    handleAppointmentSelection
  }
}
