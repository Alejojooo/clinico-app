import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

export const PatientContext = createContext()

PatientProvider.propTypes = {
  children: PropTypes.node
}

export function PatientProvider({ children }) {
  const [activePatient, setActivePatient] = useState(null)

  return (
    <PatientContext.Provider value={{ activePatient, setActivePatient }}>
      {children}
    </PatientContext.Provider>
  )
}
