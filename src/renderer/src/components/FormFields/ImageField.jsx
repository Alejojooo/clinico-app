import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import useImage from '../../hooks/useImage'
import Image from '../Base/Image'

ImageField.propTypes = {
  imageData: PropTypes.string,
  onImageChange: PropTypes.func
}

export default function ImageField({ imageData, onImageChange }) {
  const { image, imageVisible, handleImageVisibility, handleOpenImage, handleDeleteImage } =
    useImage(imageData, onImageChange)

  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        width: '15rem',
        height: '15rem',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'light.main',
        borderRadius: '1.5rem',
        overflow: 'clip',
        '&:hover .action-bar': {
          opacity: 1
        }
      }}
    >
      <Stack
        direction="row"
        spacing="0.5rem"
        className="action-bar"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'secondary.main',
          opacity: 0,
          transition: 'opacity 0.3s'
        }}
      >
        <IconButton onClick={handleImageVisibility}>
          {imageVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
        <IconButton onClick={handleOpenImage}>
          <FolderOutlinedIcon />
        </IconButton>
        {/* <IconButton onClick={handlePasteImage}>
          <ContentPasteOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={handleDeleteImage}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Stack>
      {imageVisible ? (
        image ? (
          <Image src={image} />
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', verticalAlign: 'center' }}>
            No hay imagen disponible
          </Typography>
        )
      ) : (
        <PortraitOutlinedIcon fontSize="large" />
      )}
    </Stack>
  )
}
