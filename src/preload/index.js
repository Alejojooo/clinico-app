import { electronAPI } from '@electron-toolkit/preload'
import { clipboard, contextBridge, ipcRenderer } from 'electron'
import { OPTIONS } from '../main/utils/dialog'

// Custom APIs for renderer
const user = {
  newUser: (user) => ipcRenderer.invoke('user:new', user),
  getUsers: () => ipcRenderer.invoke('user:getAll'),
  getUserById: (id) => ipcRenderer.invoke('user:getOne', id),
  updateUser: (id, user) => ipcRenderer.invoke('user:update', id, user),
  updatePassword: (id, passwords) => ipcRenderer.invoke('user:updatePassword', id, passwords),
  deleteUser: (id) => ipcRenderer.invoke('user:delete', id),
  login: (username, password) => ipcRenderer.invoke('user:login', username, password)
}

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
  deleteMedicalRecord: (id, responsibleMedicalStaff) =>
    ipcRenderer.invoke('medicalRecord:delete', id, responsibleMedicalStaff)
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

const appointment = {
  newAppointment: (appointment) => ipcRenderer.invoke('appointment:new', appointment),
  getAppointmentsByDate: (date) => ipcRenderer.invoke('appointment:getByDate', date),
  getNextPatientAppointment: (patientId) => ipcRenderer.invoke('appointment:getNearest', patientId),
  getAppointmentById: (id) => ipcRenderer.invoke('appointment:getOne', id),
  updateAppointment: (id, appointment) => ipcRenderer.invoke('appointment:update', id, appointment),
  deleteAppointment: (id) => ipcRenderer.invoke('appointment:delete', id)
}

const dialog = {
  OK_OPTION: OPTIONS.OK,
  CANCEL_OPTION: OPTIONS.CANCEL,
  showConfirmDialog: (title, message) =>
    ipcRenderer.invoke('dialog:showConfirmDialog', title, message)
}

const image = {
  openImage: () => ipcRenderer.invoke('image:openImage'),
  readImageInClipboard: () => clipboard.readImage(),
  convertImage: (base64Image) => ipcRenderer.invoke('image:convertImage', base64Image)
}

const doc = {
  exportPrescriptionToDocx: (fields) => ipcRenderer.invoke('doc:docxExport', fields),
  printDocument: (fields) => ipcRenderer.invoke('doc:print', fields)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('user', user)
    contextBridge.exposeInMainWorld('patient', patient)
    contextBridge.exposeInMainWorld('medicalRecord', medicalRecord)
    contextBridge.exposeInMainWorld('medicalRecordPhoto', medicalRecordPhoto)
    contextBridge.exposeInMainWorld('drug', drug)
    contextBridge.exposeInMainWorld('appointment', appointment)
    contextBridge.exposeInMainWorld('dialog', dialog)
    contextBridge.exposeInMainWorld('image', image)
    contextBridge.exposeInMainWorld('doc', doc)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.user = user
  window.patient = patient
  window.medicalRecord = medicalRecord
  window.medicalRecordPhoto = medicalRecordPhoto
  window.drug = drug
  window.appointment = appointment
  window.dialog = dialog
  window.image = image
  window.doc = doc
}
