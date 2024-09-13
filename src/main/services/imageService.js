import sharp from 'sharp'
import { readFileSync, unlinkSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { dialog } from 'electron'

export async function openImage() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  })
  if (canceled) return null
  const imagePath = filePaths[0]
  return loadImage(imagePath)
}

export async function loadImage(imagePath) {
  try {
    const imageBuffer = readFileSync(imagePath)
    const base64Image = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer()
    return `data:image/jpeg;base64,${base64Image.toString('base64')}`
  } catch (err) {
    return null
  }
}

export async function saveImage(base64Image, imagePath) {
  const targetDirectory = dirname(imagePath)
  if (!existsSync(targetDirectory)) mkdirSync(targetDirectory, { recursive: true })
  try {
    const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, '')
    const imgBuffer = Buffer.from(base64Data, 'base64')
    await sharp(imgBuffer).jpeg({ quality: 80 }).toFile(imagePath)
    return null
  } catch (err) {
    return `Hubo un error guardando la imagen ${err}`
  }
}

export function deleteImage(imagePath) {
  if (!imagePath) return 'No se especificó una ruta válida para la imagen.'
  try {
    unlinkSync(imagePath)
    return null
  } catch (err) {
    return `No se pudo eliminar la imagen en ${imagePath}`
  }
}
