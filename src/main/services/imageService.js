import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { dialog } from 'electron'
import { gridfsBucket } from '../database'

export async function openImage() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  })
  if (canceled) return null
  const imagePath = filePaths[0]
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
    if (!files || files.length === 0)
      throw new Error('No existe una imagen a eliminar con los metadatos proporcionados')

    const fileId = files[0]._id
    await gridfsBucket.delete(fileId)
  } catch (err) {
    console.error(err)
  }
}
