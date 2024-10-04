import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
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

  const changeModule = (module) => {
    setActiveModule(module)
    setActiveSection(DEFAULT_SECTION_PER_MODULE[module])
  }

  const addSnackbar = (message) => {
    const newSnackbar = { id: Date.now(), message: message }
    setSnackbars([...snackbars, newSnackbar])
  }

  const removeSnackbar = (id) => {
    const newSnackbars = snackbars.filter((snackbar) => snackbar.id !== id)
    setSnackbars(newSnackbars)
  }

  return (
    <ViewContext.Provider
      value={{ activeModule, activeSection, setActiveSection, changeModule, addSnackbar }}
    >
      <SnackbarPile snackbars={snackbars} onRemove={removeSnackbar}></SnackbarPile>
      {children}
    </ViewContext.Provider>
  )
}
