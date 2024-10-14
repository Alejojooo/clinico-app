import { EyeIcon, EyeSlashIcon, UserIcon } from '@heroicons/react/24/outline'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { IconButton } from '@mui/material'
import PropTypes from 'prop-types'
import useImage from '../../hooks/useImage'

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
        <IconButton onClick={handleImageVisibility}>
          {imageVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
        <IconButton>
          <PhotoCameraOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleOpenImage}>
          <FolderOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleDeleteImage}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}
