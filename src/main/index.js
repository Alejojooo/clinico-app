import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import {
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByDate,
  getNextPatientAppointment,
  newAppointment,
  updateAppointment
} from './services/appointment.js'
import { exportPrescriptionToDocx, printDocument } from './services/docs.js'
import { deleteDrug, getDrugById, getDrugs, newDrug, updateDrug } from './services/drug.js'
import {
  deleteMedicalRecord,
  getMedicalRecordById,
  getMedicalRecords,
  newMedicalRecord,
  updateMedicalRecord
} from './services/medicalRecord.js'
import {
  deleteMedicalRecordPhoto,
  getMedicalRecordPhotoById,
  getMedicalRecordPhotos,
  newMedicalRecordPhoto,
  updateMedicalRecordPhotoDescription
} from './services/medicalRecordPhotos.js'
import {
  deletePatient,
  getPatientById,
  getPatients,
  newPatient,
  updatePatient
} from './services/patient.js'
import { showConfirmDialog } from './utils/dialog.js'
import { openImage } from './utils/image.js'
import { setMainWindow } from './utils/windowManager.js'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  setMainWindow(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import('./utils/database.js')

ipcMain.handle('patient:new', newPatient)
ipcMain.handle('patient:getAll', getPatients)
ipcMain.handle('patient:getOne', getPatientById)
ipcMain.handle('patient:update', updatePatient)
ipcMain.handle('patient:delete', deletePatient)

ipcMain.handle('medicalRecord:new', newMedicalRecord)
ipcMain.handle('medicalRecord:getAll', getMedicalRecords)
ipcMain.handle('medicalRecord:getOne', getMedicalRecordById)
ipcMain.handle('medicalRecord:update', updateMedicalRecord)
ipcMain.handle('medicalRecord:delete', deleteMedicalRecord)

ipcMain.handle('medicalRecordPhoto:new', newMedicalRecordPhoto)
ipcMain.handle('medicalRecordPhoto:getAll', getMedicalRecordPhotos)
ipcMain.handle('medicalRecordPhoto:getOne', getMedicalRecordPhotoById)
ipcMain.handle('medicalRecordPhoto:update', updateMedicalRecordPhotoDescription)
ipcMain.handle('medicalRecordPhoto:delete', deleteMedicalRecordPhoto)

ipcMain.handle('drug:new', newDrug)
ipcMain.handle('drug:getAll', getDrugs)
ipcMain.handle('drug:getOne', getDrugById)
ipcMain.handle('drug:update', updateDrug)
ipcMain.handle('drug:delete', deleteDrug)

ipcMain.handle('appointment:new', newAppointment)
ipcMain.handle('appointment:getByDate', getAppointmentsByDate)
ipcMain.handle('appointment:getNearest', getNextPatientAppointment)
ipcMain.handle('appointment:getOne', getAppointmentById)
ipcMain.handle('appointment:update', updateAppointment)
ipcMain.handle('appointment:delete', deleteAppointment)

ipcMain.handle('dialog:showConfirmDialog', showConfirmDialog)

ipcMain.handle('image:openImage', openImage)

ipcMain.handle('doc:docxExport', exportPrescriptionToDocx)
ipcMain.handle('doc:print', printDocument)
