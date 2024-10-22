import { is } from '@electron-toolkit/utils'
import Docxtemplater from 'docxtemplater'
import { shell } from 'electron'
import { exec } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import PizZip from 'pizzip'
import { formatDate, isValidDate } from '../utils/date'
import { openFileSaveDialog } from '../utils/dialog'

async function createDocx(fields) {
  const newFields = { ...fields }
  for (const field in newFields) {
    if (isValidDate(newFields[field]))
      newFields[field] = formatDate(newFields[field], { pretty: true })
  }

  const baseDirectory = is.dev && process.env['ELECTRON_RENDERER_URL'] ? process.cwd() : __dirname

  // Cargar el documento de plantilla
  const content = readFileSync(join(baseDirectory, 'template.docx'), 'binary')
  const zip = new PizZip(content)
  const doc = new Docxtemplater(zip)

  // Reemplazar los campos
  doc.setData(newFields)
  doc.render()

  // Exportar el documento con los datos reemplazados
  const buf = doc.getZip().generate({ type: 'nodebuffer' })
  const filePath = await openFileSaveDialog('docx')
  if (!filePath) return null
  writeFileSync(filePath, buf)

  return filePath
}

export async function exportPrescriptionToDocx(event, fields) {
  try {
    const filePath = createDocx(fields)
    if (filePath) shell.openPath(filePath)
    return { outcome: 'success' }
  } catch (err) {
    console.error(err)
    return { outcome: 'failure' }
  }
}

export async function printDocument(event, fields) {
  try {
    const { filePath } = await createDocx(fields)
    const platform = process.platform

    if (platform === 'win32') {
      printDocumentWindows(filePath)
    } else if (platform === 'darwin') {
      printDocumentMac(filePath)
    } else if (platform === 'linux') {
      printDocumentLinux(filePath)
    } else {
      throw new Error('Plataforma no soportada para la impresión automática.')
    }
    return { outcome: 'success' }
  } catch (err) {
    console.error(err)
    return { outcome: 'failure' }
  }
}

function printDocumentWindows(filePath) {
  const printCommand = `Start-Process -FilePath "${filePath}" -Verb Print`
  exec(`powershell.exe ${printCommand}`, (error) => {
    if (error) {
      console.error(`Error al imprimir: ${error.message}`)
    }
  })
}

function printDocumentMac(filePath) {
  const printCommand = `lpr "${filePath}"`
  exec(printCommand, (error) => {
    if (error) {
      console.error(`Error al imprimir: ${error.message}`)
    }
  })
}

function printDocumentLinux(filePath) {
  const printCommand = `lp "${filePath}"`
  exec(printCommand, (error) => {
    if (error) {
      console.error(`Error al imprimir: ${error.message}`)
    }
  })
}
