import {
  CameraIcon,
  EyeIcon,
  EyeSlashIcon,
  FolderIcon,
  TrashIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import useImage from '../hooks/useImage'
import IconButton from './IconButton'

FormImageField.propTypes = {
  imageData: PropTypes.string,
  onImageChange: PropTypes.func
}

export default function FormImageField({ imageData, onImageChange }) {
  const [image, imageVisible, setImageVisible, handleOpenImage, handleDeleteImage] = useImage(
    imageData,
    onImageChange
  )

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
      <div className="absolute inset-x-0 bottom-0 flex h-12 w-full flex-row justify-center gap-2 bg-secondary opacity-0 transition-opacity group-hover:opacity-100">
        <IconButton
          icon={imageVisible ? <EyeSlashIcon /> : <EyeIcon />}
          onClick={() => setImageVisible(!imageVisible)}
        />
        <IconButton icon={<CameraIcon />} />
        <IconButton icon={<FolderIcon />} onClick={handleOpenImage} />
        <IconButton icon={<TrashIcon />} onClick={handleDeleteImage} />
      </div>
    </div>
  )
}
