import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const AppointmentContext = createContext()

AppointmentProvider.propTypes = {
  children: PropTypes.node
}

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  )
}
