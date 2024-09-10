import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const database = {
  newPatient: (patient) => ipcRenderer.invoke('patient:new', patient),
  getPatients: () => ipcRenderer.invoke('patient:getAll'),
  getPatientById: (id) => ipcRenderer.invoke('patient:getOne', id),
  updatePatient: (id, patient) => ipcRenderer.invoke('patient:update', id, patient),
  deletePatient: (id) => ipcRenderer.invoke('patient:delete', id)
}

const fs = {
  openImage: () => ipcRenderer.invoke('fs:openImage')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('database', database)
    contextBridge.exposeInMainWorld('fs', fs)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.database = database
  window.fs = fs
}
