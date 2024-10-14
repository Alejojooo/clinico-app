import { dialog } from 'electron'
import { getMainWindow } from './windowManager'

export const OPTIONS = {
  OK: 0,
  CANCEL: 1
}

export async function openImageDialog() {
  const window = getMainWindow()
  const { canceled, filePaths } = await dialog.showOpenDialog(window, {
    properties: ['openFile'],
    filters: [{ name: 'Imágenes', extensions: ['jpg', 'png', 'gif'] }]
  })
  if (canceled) return null
  return filePaths[0]
}

export async function showConfirmDialog(event, title, message, detail) {
  const window = getMainWindow()
  const options = {
    type: 'question',
    buttons: ['OK', 'Cancel'],
    defaultId: OPTIONS.CANCEL,
    title: title,
    message: message,
    detail: detail ?? 'Selecciona una opción para continuar o cancelar la operación.'
  }
  const { response } = await dialog.showMessageBox(window, options)
  return response
}
