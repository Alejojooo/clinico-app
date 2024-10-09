import { MedicalRecord } from '../models/MedicalRecord'
import { MedicalRecordPhoto, SCHEMA_FIELDS } from '../models/MedicalRecordPhoto'
import { cleanData, serialize } from '../utils/form'
import { getImage, saveImage } from './imageService'

export async function newMedicalRecordPhoto(event, formData) {
  try {
    const photoData = cleanData(formData, SCHEMA_FIELDS)
    photoData.image = await saveImage(formData.image)
    const newPhoto = await MedicalRecordPhoto.create(photoData)
    MedicalRecord.findByIdAndUpdate(formData.medicalRecordId, {
      $push: { photos: newPhoto.image }
    })
    return { outcome: 'success', payload: toFormData(newPhoto) }
  } catch (err) {
    return { outcome: 'failure', payload: err }
  }
}

export async function getMedicalRecordPhotos(event, medicalRecordId) {
  const photos = (
    await MedicalRecordPhoto.find({ medicalRecordId: medicalRecordId }).select('_id description')
  ).sort('description')
  return serialize(photos.map((photo) => ({ _id: photo._id, label: photo.description })))
}

export async function getPhotoById(event, id) {
  const image = await MedicalRecordPhoto.findById(id)
  return await toFormData(image)
}

export async function updateMedicalRecordPhotoDescription(event, id, formData) {
  const photoData = cleanData(formData, ['description'])
  const targetPhoto = await MedicalRecordPhoto.findById(id)

  // TODO: Solo actualizar la descripción
  for (const field in photoData) {
    targetPhoto[field] = photoData[field]
  }

  if ()


}

async function toFormData(photo) {
  const photoData = serialize(photo)
  photoData.image = await getImage(photo.image)
  return photoData
}
