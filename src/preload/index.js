import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { OPTIONS } from '../main/utils/dialog'

// Custom APIs for renderer
const patient = {
  newPatient: (patient) => ipcRenderer.invoke('patient:new', patient),
  getPatients: () => ipcRenderer.invoke('patient:getAll'),
  getPatientById: (id) => ipcRenderer.invoke('patient:getOne', id),
  updatePatient: (id, patient) => ipcRenderer.invoke('patient:update', id, patient),
  deletePatient: (id) => ipcRenderer.invoke('patient:delete', id)
}

const medicalRecord = {
  newMedicalRecord: (medicalRecord) => ipcRenderer.invoke('medicalRecord:new', medicalRecord),
  getMedicalRecords: (patientId) => ipcRenderer.invoke('medicalRecord:getAll', patientId),
  getMedicalRecordById: (id) => ipcRenderer.invoke('medicalRecord:getOne', id),
  updateMedicalRecord: (id, medicalRecord) =>
    ipcRenderer.invoke('medicalRecord:update', id, medicalRecord),
  deleteMedicalRecord: (id) => ipcRenderer.invoke('medicalRecord:delete', id)
}

const medicalRecordPhoto = {
  newPhoto: (photo) => ipcRenderer.invoke('medicalRecordPhoto:new', photo),
  getPhotos: (medicalRecordId) => ipcRenderer.invoke('medicalRecordPhoto:getAll', medicalRecordId),
  getPhotoById: (id) => ipcRenderer.invoke('medicalRecordPhoto:getOne', id),
  updatePhotoDescription: (id, description) =>
    ipcRenderer.invoke('medicalRecordPhoto:update', id, description),
  deletePhoto: (id) => ipcRenderer.invoke('medicalRecordPhoto:delete', id)
}

const drug = {
  newDrug: (drug) => ipcRenderer.invoke('drug:new', drug),
  getDrugs: () => ipcRenderer.invoke('drug:getAll'),
  getDrugById: (id) => ipcRenderer.invoke('drug:getOne', id),
  updateDrug: (id, drug) => ipcRenderer.invoke('drug:update', id, drug),
  deleteDrug: (id) => ipcRenderer.invoke('drug:delete', id)
}

const dialog = {
  OK_OPTION: OPTIONS.OK,
  CANCEL_OPTION: OPTIONS.CANCEL,
  showConfirmDialog: (title, message) =>
    ipcRenderer.invoke('dialog:showConfirmDialog', title, message)
}

const image = {
  openImage: () => ipcRenderer.invoke('image:openImage')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('patient', patient)
    contextBridge.exposeInMainWorld('medicalRecord', medicalRecord)
    contextBridge.exposeInMainWorld('medicalRecordPhoto', medicalRecordPhoto)
    contextBridge.exposeInMainWorld('drug', drug)
    contextBridge.exposeInMainWorld('dialog', dialog)
    contextBridge.exposeInMainWorld('image', image)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.patient = patient
  window.medicalRecord = medicalRecord
  window.medicalRecordPhoto = medicalRecordPhoto
  window.drug = drug
  window.dialog = dialog
  window.image = image
}
