import PropTypes from 'prop-types'
import { createContext, useEffect, useRef, useState } from 'react'
import { SnackbarPile } from '../components/Snackbar'
import useView from '../hooks/useView'

SnackbarProvider.propTypes = {
  children: PropTypes.node
}

export const SnackbarContext = createContext()

export function SnackbarProvider({ children }) {
  const { activeSection, activeModule } = useView()
  const [snackbars, setSnackbars] = useState([])
  const snackbarsRef = useRef([])
  const snackbarId = useRef(null)

  useEffect(() => {
    changeSnackbars([])
  }, [activeSection, activeModule])

  const changeSnackbars = (values) => {
    snackbarsRef.current = values
    setSnackbars(snackbarsRef.current)
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

  const showSnackbar = (message, clearPersistent = false) => {
    if (clearPersistent) clearPersistentSnackbar()
    addSnackbar(message)
  }

  const showPersistentSnackbar = (message) => {
    if (snackbarId.current) clearPersistentSnackbar()
    snackbarId.current = addSnackbar(message, true)
  }

  const clearPersistentSnackbar = () => {
    if (snackbarId.current) {
      removeSnackbar(snackbarId.current, 1)
      snackbarId.current = null
    }
  }

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        showPersistentSnackbar,
        clearPersistentSnackbar
      }}
    >
      <SnackbarPile snackbars={snackbars} onDismiss={removeSnackbar} />
      {children}
    </SnackbarContext.Provider>
  )
}
