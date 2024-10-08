import { useRef } from 'react'
import { useView } from './useView'

export default function useSnackbar() {
  const { addSnackbar, removeSnackbar } = useView()
  const snackbarId = useRef(null)

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

  return { showSnackbar, showPersistentSnackbar, clearPersistentSnackbar }
}
