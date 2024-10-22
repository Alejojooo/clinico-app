import PropTypes from 'prop-types'
import { useState, createContext, useEffect } from 'react'

export const PatientContext = createContext()

export const PATIENT_IDENTIFICATION_STATES = {
  NO_PATIENT: 'NO_PATIENT',
  PATIENT_SELECTED: 'PATIENT_SELECTED',
  CREATING_PATIENT: 'CREATING_PATIENT',
  UPDATING_PATIENT: 'UPDATING_PATIENT'
}

PatientProvider.propTypes = {
  children: PropTypes.node
}

export function PatientProvider({ children }) {
  const [activePatient, setActivePatient] = useState(null)
  const [nextAppointment, setNextAppointment] = useState(null)

  useEffect(() => {
    if (activePatient)
      window.appointment.getNextPatientAppointment(activePatient._id).then((appointment) => {
        setNextAppointment(appointment)
      })
  }, [activePatient])

  return (
    <PatientContext.Provider value={{ activePatient, setActivePatient, nextAppointment }}>
      {children}
    </PatientContext.Provider>
  )
}
