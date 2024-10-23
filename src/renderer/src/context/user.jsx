import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const UserContext = createContext()

UserProvider.propTypes = {
  children: PropTypes.node
}

export function UserProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null)

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>{children}</UserContext.Provider>
  )
}
