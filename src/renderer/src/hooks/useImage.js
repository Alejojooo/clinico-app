import { useState, useEffect } from 'react'

export default function useImage(imageData, onImageChange) {
  const [image, setImage] = useState(null)
  const [imageVisible, setImageVisible] = useState(true)

  useEffect(() => {
    if (imageData) setImage(imageData)
    else setImage(null)
  }, [imageData])

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

  return [image, imageVisible, setImageVisible, handleOpenImage, handleDeleteImage]
}
