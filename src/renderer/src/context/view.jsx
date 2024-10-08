import PropTypes from 'prop-types'
import { createContext, useState, useEffect, useRef } from 'react'
import { SnackbarPile } from '../components/Snackbar'
import { DEFAULT_SECTION_PER_MODULE, MODULES } from '../utils/view'

export const ViewContext = createContext()

ViewProvider.propTypes = {
  children: PropTypes.node
}

export function ViewProvider({ children }) {
  const [activeModule, setActiveModule] = useState(MODULES.PATIENT)
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_PER_MODULE[MODULES.PATIENT])
  const [snackbars, setSnackbars] = useState([])
  const snackbarsRef = useRef([])
  const prevModule = useRef(activeModule)
  const prevSection = useRef(activeSection)

  useEffect(() => {
    if (prevModule.current !== activeModule || prevSection.current !== activeSection) {
      changeSnackbars([])
      prevModule.current = activeModule
      prevSection.current = activeSection
    }
  }, [activeModule, activeSection])

  const changeSnackbars = (values) => {
    snackbarsRef.current = values
    setSnackbars(snackbarsRef.current)
  }

  const changeModule = (module) => {
    setActiveModule(module)
    setActiveSection(DEFAULT_SECTION_PER_MODULE[module])
  }

  const addSnackbar = (message, persistent = false) => {
    const id = Date.now()
    const newSnackbar = { id, message, persistent }
    changeSnackbars([...snackbarsRef.current, newSnackbar])
    return id
  }

  const removeSnackbar = (id, delay = 300) => {
    setTimeout(() => {
      changeSnackbars(snackbarsRef.current.filter((snackbar) => snackbar.id !== id))
    }, delay)
  }

  return (
    <ViewContext.Provider
      value={{
        activeModule,
        activeSection,
        setActiveSection,
        changeModule,
        addSnackbar,
        removeSnackbar
      }}
    >
      <SnackbarPile snackbars={snackbars} onDismiss={removeSnackbar}></SnackbarPile>
      {children}
    </ViewContext.Provider>
  )
}
