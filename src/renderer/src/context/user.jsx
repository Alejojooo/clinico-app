import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const UserContext = createContext()

UserProvider.propTypes = {
  children: PropTypes.node
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
  )
}
