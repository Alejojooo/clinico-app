import {
  CameraIcon,
  EyeIcon,
  EyeSlashIcon,
  FolderIcon,
  TrashIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import useImage from '../../hooks/useImage'
import IconButton from '../Buttons/IconButton'

ImageField.propTypes = {
  imageData: PropTypes.string,
  onImageChange: PropTypes.func
}

export default function ImageField({ imageData, onImageChange }) {
  const { image, imageVisible, handleImageVisibility, handleOpenImage, handleDeleteImage } =
    useImage(imageData, onImageChange)

  return (
    <div className="group relative flex size-60 items-center justify-center overflow-clip rounded-3xl bg-primary">
      {imageVisible ? (
        image ? (
          <img src={image} alt="Fotografía del paciente" className="object-cover" />
        ) : (
          <span className="text-center align-middle">No hay imagen disponible</span>
        )
      ) : (
        <UserIcon></UserIcon>
      )}
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-row justify-center gap-2 bg-secondary opacity-0 transition-opacity group-hover:opacity-100">
        <IconButton
          icon={imageVisible ? <EyeSlashIcon className="size-6" /> : <EyeIcon className="size-6" />}
          onClick={handleImageVisibility}
        />
        <IconButton icon={<CameraIcon className="size-6" />} />
        <IconButton icon={<FolderIcon className="size-6" />} onClick={handleOpenImage} />
        <IconButton icon={<TrashIcon className="size-6" />} onClick={handleDeleteImage} />
      </div>
    </div>
  )
}
