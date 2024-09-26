import PropTypes from 'prop-types'
import { useState, createContext } from 'react'
import { MODULES, DEFAULT_SECTION_PER_MODULE } from '../constants'

export const ViewContext = createContext()

ViewProvider.propTypes = {
  children: PropTypes.node
}

export function ViewProvider({ children }) {
  const [activeModule, setActiveModule] = useState(MODULES.PATIENT)
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_PER_MODULE[MODULES.PATIENT])

  const changeModule = (module) => {
    setActiveModule(module)
    setActiveSection(DEFAULT_SECTION_PER_MODULE[module])
  }

  return (
    <ViewContext.Provider value={{ activeModule, changeModule, activeSection, setActiveSection }}>
      {children}
    </ViewContext.Provider>
  )
}
