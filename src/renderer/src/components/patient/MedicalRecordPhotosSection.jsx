import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { Button, ButtonGroup, IconButton, Stack, TextField, Typography } from '@mui/material'
import useMedicalRecordPhoto from '../../hooks/useMedicalRecordPhoto'
import Image from '../Base/Image'
import FilterableDocumentList from '../SearchableDocumentList'

// TODO: Agregarle funcionalidad al botón de agrandar imagen

export default function MedicalRecordPhotosSection() {
  const {
    formData,
    activePhoto,
    photos,
    disabledButtons,
    handleField,
    handleOpenPhoto,
    handleUpdatePhotoDescription,
    handleSavePhoto,
    handleDeletePhoto,
    handlePhotoSelection,
    handleMedicalRecordSection
  } = useMedicalRecordPhoto()

  return (
    <Stack
      component="main"
      direction="row"
      spacing="1.25rem"
      sx={{ width: 1, height: 1, padding: '1.25rem' }}
    >
      <Stack direction="column" spacing="1.25rem" sx={{ width: 1 / 4, maxWidth: '25rem' }}>
        <Button
          sx={{ justifyContent: 'start' }}
          startIcon={<ArrowBackOutlinedIcon />}
          variant="text"
          onClick={handleMedicalRecordSection}
        >
          Volver al historial clínico
        </Button>
        <FilterableDocumentList
          activeDocument={activePhoto}
          documents={photos}
          handleDocSelection={handlePhotoSelection}
          title="Imágenes"
        ></FilterableDocumentList>
        <Stack direction="column" spacing="0.625rem" sx={{ width: 1 }}>
          <Typography variant="button" component="span">
            Insertar desde
          </Typography>
          <Stack direction="row">
            <ButtonGroup
              sx={{
                width: 1,
                '& .MuiButtonBase-root': {
                  width: 1
                }
              }}
              variant="outlined"
            >
              <Button
                startIcon={<FolderOutlinedIcon />}
                onClick={handleOpenPhoto}
                disabled={disabledButtons.includes('new')}
              >
                Archivo
              </Button>
              <Button
                startIcon={<PhotoCameraOutlinedIcon />}
                disabled={disabledButtons.includes('camera')}
              >
                Cámara
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
        <Stack direction="column" spacing="0.625rem" sx={{ width: 1 }}>
          <Typography variant="button">Acciones</Typography>
          <Stack direction="row">
            <ButtonGroup
              variant="outlined"
              sx={{
                width: 1,
                '& .MuiButtonBase-root': {
                  width: 1
                }
              }}
            >
              <Button
                startIcon={<SaveOutlinedIcon />}
                onClick={handleSavePhoto}
                disabled={disabledButtons.includes('save')}
              >
                Guardar
              </Button>
              <Button
                startIcon={<DeleteOutlinedIcon />}
                onClick={handleDeletePhoto}
                disabled={disabledButtons.includes('update')}
              >
                Eliminar
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" spacing="0.625rem" sx={{ flexGrow: 1, height: 1 }}>
        <Stack direction="row" spacing="1.25rem" sx={{ width: 1, alignItems: 'center' }}>
          <TextField
            id="description"
            name="description"
            label="Descripción"
            variant="outlined"
            value={formData.description}
            onChange={handleField}
            slotProps={{
              input: {
                readOnly: formData.image ? false : true
              }
            }}
            size="small"
            fullWidth
          ></TextField>
          <Stack direction="row" spacing="0.625rem" sx={{ alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<AutorenewOutlinedIcon />}
              onClick={handleUpdatePhotoDescription}
              disabled={disabledButtons.includes('update')}
            >
              Actualizar
            </Button>
            <Stack
              direction="row"
              sx={{
                width: '2.5rem',
                height: '2.5rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconButton>
                <ZoomOutMapOutlinedIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: 1,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '1rem',
            overflow: 'clip'
          }}
        >
          {formData.image ? (
            <Image src={formData.image} />
          ) : (
            <span>No hay imagen para mostrar</span>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
