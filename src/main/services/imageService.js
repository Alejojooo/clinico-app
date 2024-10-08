import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import sharp from 'sharp'
import { gridfsBucket } from '../utils/database'
import { openImageDialog } from './dialogService'
import { ObjectId } from 'mongodb'

export async function openImage() {
  const imagePath = await openImageDialog()
  if (!imagePath) return null
  return convertToBase64(imagePath)
}

async function convertToBase64(imagePath) {
  try {
    const imageBuffer = readFileSync(imagePath)
    const base64Image = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer()
    return `data:image/jpeg;base64,${base64Image.toString('base64')}`
  } catch (err) {
    return null
  }
}

export async function getImage(imageId) {
  if (!imageId) return null
  try {
    const base64Image = await new Promise((resolve, reject) => {
      const data = []
      gridfsBucket
        .openDownloadStream(getObjectId(imageId))
        .on('data', (chunk) => data.push(chunk))
        .on('error', () => {
          reject(new Error('Error al cargar la imagen'))
        })
        .on('end', () => {
          const buffer = Buffer.concat(data)
          const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`
          resolve(base64Image)
        })
    })
    return base64Image
  } catch (err) {
    console.error(err)
    return null
  }
}

function getObjectId(imageId) {
  if (imageId instanceof ObjectId) return imageId
  if (typeof imageId === 'string') return new ObjectId(imageId)
  throw new Error('No se pudo convertir la imageId proporcionada')
}

export function generateImageHash(base64Image) {
  if (!base64Image || typeof base64Image !== 'string') return null
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
  const imgBuffer = Buffer.from(base64Data, 'base64')
  return createHash('sha256').update(imgBuffer).digest('hex')
}

export async function getFilename(imageId) {
  try {
    const files = await gridfsBucket.find({ _id: getObjectId(imageId) }).toArray()
    if (!files || files.length === 0) return null
    return files[0].filename
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function saveImage(base64Image, name) {
  if (!base64Image) return null
  const metadata = {
    contentType: 'image/jpeg'
  }

  try {
    const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, '')
    const imgBuffer = Buffer.from(base64Data, 'base64')
    const image = await sharp(imgBuffer).resize({ width: 800 }).jpeg({ quality: 80 }).toBuffer()
    const imageName = `${name ?? generateImageHash(base64Image)}.jpg`
    const uploadStream = gridfsBucket.openUploadStream(imageName, { metadata: metadata })

    return new Promise((resolve, reject) => {
      uploadStream
        .end(image)
        .on('finish', () => {
          console.log('Imagen guardada en GridFS')
          resolve(uploadStream.id)
        })
        .on('error', () => {
          reject(new Error('Error al guardar la imagen'))
        })
    })
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function deleteImage(imageId) {
  if (!imageId) return
  try {
    await gridfsBucket.delete(getObjectId(imageId))
  } catch (err) {
    console.error(err)
  }
}
