import { useEffect, useState } from 'react'
import useSnackbar from './useSnackbar'

export default function useImage(imageData, onImageChange) {
  const [image, setImage] = useState(imageData ?? null)
  const [imageVisible, setImageVisible] = useState(true)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    setImage(imageData ?? null)
  }, [imageData])

  const handleImageVisibility = () => {
    setImageVisible(!imageVisible)
  }

  const handleOpenImage = async () => {
    const newImage = await window.image.openImage()
    if (newImage) {
      setImage(newImage)
      onImageChange(newImage)
    }
  }

  const handlePasteImage = async () => {
    const image = await window.image.readImageInClipboard()
    if (!image.isEmpty()) {
      const imageBase64 = image.toDataURL()
      setImage(imageBase64)
    } else {
      showSnackbar('No hay imagen en el portapapeles')
    }
  }

  const handleDeleteImage = () => {
    setImage(null)
    onImageChange(null)
  }

  return {
    image,
    imageVisible,
    handleImageVisibility,
    handleOpenImage,
    handlePasteImage,
    handleDeleteImage
  }
}
