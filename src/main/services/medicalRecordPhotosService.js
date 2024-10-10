import { MedicalRecord } from '../models/MedicalRecord'
import { MedicalRecordPhoto, SCHEMA_FIELDS } from '../models/MedicalRecordPhoto'
import { cleanData, parseErrors, serialize } from '../utils/form'
import { deleteImage, getImage, saveImage } from './imageService'

export async function newMedicalRecordPhoto(event, formData) {
  try {
    const photoData = cleanData(formData, SCHEMA_FIELDS)
    const newPhoto = await MedicalRecordPhoto.create(photoData)
    newPhoto.image = await saveImage(formData.image)
    newPhoto.save()

    MedicalRecord.findByIdAndUpdate(formData.medicalRecordId, {
      $push: { photos: newPhoto.image }
    })
    return { outcome: 'success', payload: await toFormData(newPhoto) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function getMedicalRecordPhotos(event, medicalRecordId) {
  const photos = await MedicalRecordPhoto.find({ medicalRecordId: medicalRecordId })
    .select('_id description')
    .sort('description')
  return serialize(photos.map((photo) => ({ _id: photo._id, label: photo.description })))
}

export async function getMedicalRecordPhotoById(event, id) {
  const image = await MedicalRecordPhoto.findById(id)
  return await toFormData(image)
}

export async function updateMedicalRecordPhotoDescription(event, id, description) {
  try {
    const targetPhoto = await MedicalRecordPhoto.findById(id)
    targetPhoto.description = description
    await targetPhoto.save()
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deleteMedicalRecordPhoto(event, id) {
  const imageId = serialize(await MedicalRecordPhoto.findById(id))?.image
  await deleteImage(imageId)
  await MedicalRecord.updateOne({ photos: id }, { $pull: { photos: id } })
  await MedicalRecordPhoto.findByIdAndDelete(id)
}

async function toFormData(photo) {
  const photoData = serialize(photo)
  photoData.image = await getImage(photo.image)
  return photoData
}
