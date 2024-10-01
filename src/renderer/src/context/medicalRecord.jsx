import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

export const MedicalRecordContext = createContext()

MedicalRecordProvider.propTypes = {
  children: PropTypes.node
}

export function MedicalRecordProvider({ children }) {
  const [activeMedicalRecord, setActiveMedicalRecord] = useState(null)

  return (
    <MedicalRecordContext.Provider value={{ activeMedicalRecord, setActiveMedicalRecord }}>
      {children}
    </MedicalRecordContext.Provider>
  )
}
