import { useState, useEffect } from 'react'

export default function useImage(imageData, onImageChange) {
  const [image, setImage] = useState(imageData ?? null)
  const [imageVisible, setImageVisible] = useState(true)

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

  const handleDeleteImage = () => {
    setImage(null)
    onImageChange(null)
  }

  return { image, imageVisible, handleImageVisibility, handleOpenImage, handleDeleteImage }
}
