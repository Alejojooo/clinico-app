import { useView } from './useView'
import useMedicalRecord from './useMedicalRecord'
import { useState, useEffect, useRef } from 'react'
import useSnackbar from './useSnackbar'
import useFormChanged from './useFormChanged'
import { clean } from '../utils/form'
import { PATIENT_SECTIONS } from '../utils/view'

const initialFormData = {
  image: '',
  description: ''
}

export default function useMedicalRecordPhoto() {
  const [activePhoto, setActivePhoto] = useState(null)
  const [photos, setPhotos] = useState([])
  const [formData, setFormData] = useState(initialFormData)

  const { setActiveSection } = useView()
  const { activeMedicalRecord } = useMedicalRecord()
  const { showSnackbar, showPersistentSnackbar, clearPersistentSnackbar } = useSnackbar()
  const { hasChanged, setOriginalData } = useFormChanged(formData)

  const messageSent = useRef(false)

  useEffect(() => {
    if (activePhoto) setFormData(activePhoto)
  }, [activePhoto])

  useEffect(() => {
    getPhotos()
  }, [])

  const getPhotos = async () => {
    const newPhotos = await window.medicalRecordPhoto.getPhotos(activeMedicalRecord._id)
    setPhotos(newPhotos)
  }

  const handleField = (e) => {
    if (activePhoto && hasChanged && !messageSent.current) {
      showPersistentSnackbar('Hay cambios no guardados')
      messageSent.current = true
    }
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getCleanForm = () => {
    return clean(formData)
  }

  const handleOpenPhoto = async () => {
    const newImage = await window.image.openImage()
    if (newImage) {
      setActivePhoto(null)
      setFormData({ ...initialFormData, image: newImage })
      showPersistentSnackbar('Se va a guardar una nueva fotografía')
    }
  }

  const handleUpdatePhotoDescription = async () => {
    if (!activePhoto) {
      showSnackbar('Primero seleccione o suba una fotografía')
      return
    }
    if (!hasChanged) {
      showSnackbar('No hay cambios que guardar')
      return
    }

    const { outcome, payload } = await window.medicalRecordPhoto.updatePhotoDescription(
      activePhoto._id,
      formData.description
    )
    if (outcome === 'success') {
      showSnackbar('Se actualizó la descripción de la fotografía', true)
      await getPhotos()
    } else {
      Object.keys(payload).forEach((error) => showSnackbar(payload[error]))
    }
  }

  const handleSavePhoto = async () => {
    if (!activePhoto) {
      const newFormData = { ...getCleanForm(), medicalRecordId: activeMedicalRecord._id }
      const { outcome, payload } = await window.medicalRecordPhoto.newPhoto(newFormData)
      if (outcome === 'success') {
        setActivePhoto(payload)
        showSnackbar('Se guardó la fotografía', true)
        await getPhotos()
      } else {
        Object.keys(payload).forEach((error) => showSnackbar(payload[error]))
      }
    }
  }

  const handleDeletePhoto = async () => {
    if (!activePhoto) {
      showSnackbar('Primero seleccione una fotografía')
      return
    }
    const option = await window.dialog.showConfirmDialog(
      'Eliminar fotografía',
      '¿Está seguro de eliminar esta fotografía'
    )
    if (option === window.dialog.OK_OPTION) {
      setActivePhoto(null)
      setFormData(initialFormData)
      await window.medicalRecordPhoto.deletePhoto(activePhoto._id)
      showSnackbar('Se eliminó la fotografía')
      await getPhotos()
    }
  }

  const handlePhotoSelection = async (id) => {
    const photo = await window.medicalRecordPhoto.getPhotoById(id)
    setOriginalData(photo)
    setActivePhoto(photo)
    clearPersistentSnackbar()
    messageSent.current = false
  }

  const handleMedicalRecordSection = () => {
    setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS)
  }

  const getDisabledButtons = () => {
    if (!activePhoto) {
      return formData.image
        ? ['delete', 'update', 'maximize', 'camera']
        : ['save', 'delete', 'update', 'maximize', 'camera']
    } else return ['camera']
  }

  return {
    formData,
    activePhoto,
    photos,
    disabledButtons: getDisabledButtons(),
    handleField,
    handleOpenPhoto,
    handleUpdatePhotoDescription,
    handleSavePhoto,
    handleDeletePhoto,
    handlePhotoSelection,
    handleMedicalRecordSection
  }
}
