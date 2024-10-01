import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { gridfsBucket } from '../utils/database'
import { openImageDialog } from './dialogService'

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

export async function getImage(collection, id) {
  try {
    const files = await gridfsBucket
      .find({
        'metadata.collection': collection,
        'metadata.id': id
      })
      .toArray()

    if (!files || files.length === 0) return null

    const base64Image = await new Promise((resolve, reject) => {
      const data = []
      const fileId = files[0]._id
      gridfsBucket
        .openDownloadStream(fileId)
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

export async function saveImage(base64Image, collection, id) {
  if (!base64Image) return
  const metadata = {
    contentType: 'image/jpeg',
    collection: collection,
    id: id
  }
  try {
    const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, '')
    const imgBuffer = Buffer.from(base64Data, 'base64')
    const image = await sharp(imgBuffer).resize({ width: 800 }).jpeg({ quality: 80 }).toBuffer()
    gridfsBucket
      .openUploadStream(`${metadata.collection}-${metadata.id}.jpg`, {
        metadata: {
          collection,
          id
        }
      })
      .end(image)
      .on('finish', () => {
        console.log('Imagen guardada en GridFS')
      })
      .on('error', () => {
        throw new Error('Error al guardar la imagen')
      })
  } catch (err) {
    console.error(err)
  }
}

export async function deleteImage(collection, id) {
  try {
    const files = await gridfsBucket
      .find({
        'metadata.collection': collection,
        'metadata.id': id
      })
      .toArray()
    if (!files || files.length === 0) return

    const fileId = files[0]._id
    await gridfsBucket.delete(fileId)
  } catch (err) {
    console.error(err)
  }
}
