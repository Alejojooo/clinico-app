import { dialog } from 'electron'
import { getMainWindow } from './windowManager'

export const OPTIONS = {
  OK: 0,
  CANCEL: 1
}

export async function openImageDialog() {
  const window = getMainWindow()
  const { canceled, filePaths } = await dialog.showOpenDialog(window, {
    title: 'Abrir imagen',
    properties: ['openFile'],
    filters: [{ name: 'Imágenes', extensions: ['jpg', 'png', 'gif'] }]
  })
  if (canceled) return null
  return filePaths[0]
}

export async function openFileSaveDialog(extension) {
  const window = getMainWindow()
  const { canceled, filePath } = await dialog.showSaveDialog(window, {
    title: 'Guardar archivo',
    filters: [getFilter(extension), { name: 'Todos los archivos', extensions: ['*'] }]
  })
  if (canceled) return null
  return filePath
}

function getFilter(extension) {
  const filters = {
    docx: { name: 'Documento de Word', extensions: ['docx'] },
    pdf: { name: 'Archivo PDF', extensions: ['pdf'] }
  }
  return filters[extension]
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
