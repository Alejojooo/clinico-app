import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import { DEFAULT_SECTION_PER_MODULE, MODULES } from '../utils/view'

export const ViewContext = createContext()

ViewProvider.propTypes = {
  children: PropTypes.node
}

export function ViewProvider({ children }) {
  const [activeModule, setActiveModule] = useState(MODULES.SESSION)
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_PER_MODULE[MODULES.SESSION])

  const changeModule = (module) => {
    setActiveModule(module)
    setActiveSection(DEFAULT_SECTION_PER_MODULE[module])
  }

  return (
    <ViewContext.Provider
      value={{
        activeModule,
        activeSection,
        changeModule,
        setActiveSection
      }}
    >
      {children}
    </ViewContext.Provider>
  )
}
