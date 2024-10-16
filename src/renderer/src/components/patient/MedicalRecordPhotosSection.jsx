import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { Button, ButtonGroup, IconButton, TextField, Typography } from '@mui/material'
import useMedicalRecordPhoto from '../../hooks/useMedicalRecordPhoto'
import FilterableDocumentList from '../FilterableDocumentList'

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
    <main className="flex size-full flex-row gap-5 px-5 py-5">
      <div className="flex w-1/4 flex-col gap-5">
        <Button
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
        <div className="flex w-full flex-col gap-2.5">
          <Typography variant="button" component="span">
            Insertar desde
          </Typography>
          <div className="flex flex-row">
            <ButtonGroup variant="outlined">
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
          </div>
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <Typography variant="button" component="span">
            Acciones
          </Typography>
          <div className="flex flex-row">
            <ButtonGroup
              variant="outlined"
              sx={{ width: '100%', '& .MuiButtonBase': { width: '100%' } }}
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
          </div>
        </div>
      </div>
      <div className="flex h-full grow flex-col gap-2.5">
        <div className="flex w-full flex-row items-center gap-5">
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
          <div className="flex flex-row items-center gap-2.5">
            <Button
              variant="outlined"
              startIcon={<AutorenewOutlinedIcon />}
              onClick={handleUpdatePhotoDescription}
              disabled={disabledButtons.includes('update')}
            >
              Actualizar
            </Button>
            <div className="flex size-10 items-center justify-center">
              <IconButton>
                <ZoomOutMapOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="flex w-full grow items-center justify-center overflow-clip rounded-2xl bg-white">
          {formData.image ? (
            <img className="size-full object-contain" src={formData.image} />
          ) : (
            <span>No hay imagen para mostrar</span>
          )}
        </div>
      </div>
    </main>
  )
}
