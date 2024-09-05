import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const database = {
  newPatient: (patient) => ipcRenderer.invoke('patient:new', patient),
  getPatients: () => ipcRenderer.invoke('patient:getAll'),
  getPatientById: (id) => ipcRenderer.invoke('patient:getOne', id),
  updatePatient: (patient) => ipcRenderer.invoke('patient:update', patient)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('database', database)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.database = database
}
