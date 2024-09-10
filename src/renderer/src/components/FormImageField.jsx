import PropTypes from 'prop-types'
import {
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  CameraIcon,
  FolderIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import IconButton from './IconButton'
import { useState, useEffect } from 'react'

FormImageField.propTypes = {
  imageData: PropTypes.string,
  onImageChange: PropTypes.func
}

export default function FormImageField({ imageData, onImageChange }) {
  const [image, setImage] = useState(null)
  const [imageVisible, setImageVisible] = useState(false)

  useEffect(() => {
    if (imageData) setImage(imageData)
    else setImage(null)
  }, [imageData])

  const handleOpenImage = async () => {
    const newImage = await window.fs.openImage()
    if (newImage) {
      setImage(newImage)
      onImageChange(newImage)
    }
  }

  const handleDeleteImage = () => {
    setImage(null)
    onImageChange(null)
  }

  return (
    <div className="group relative size-60 overflow-clip rounded-3xl bg-primary">
      {image && imageVisible ? (
        <img src={image} alt="Fotografía del paciente" className="object-cover" />
      ) : (
        <UserIcon></UserIcon>
      )}
      <div className="absolute inset-x-0 bottom-0 flex h-12 w-full flex-row justify-center gap-2 bg-secondary opacity-0 transition-opacity group-hover:opacity-100">
        <IconButton
          icon={imageVisible ? <EyeSlashIcon className="size-6" /> : <EyeIcon className="size-6" />}
          onClick={() => setImageVisible(!imageVisible)}
        />
        <IconButton icon={<CameraIcon className="size-6" />} />
        <IconButton icon={<FolderIcon className="size-6" />} onClick={handleOpenImage} />
        <IconButton icon={<TrashIcon className="size-6" />} onClick={handleDeleteImage} />
      </div>
    </div>
  )
}
