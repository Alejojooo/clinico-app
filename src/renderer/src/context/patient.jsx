import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

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
  const [viewState, setViewState] = useState(PATIENT_IDENTIFICATION_STATES.NO_PATIENT)

  return (
    <PatientContext.Provider value={{ activePatient, setActivePatient, viewState, setViewState }}>
      {children}
    </PatientContext.Provider>
  )
}
