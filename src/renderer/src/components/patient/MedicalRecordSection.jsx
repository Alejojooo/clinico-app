import styled from '@emotion/styled'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import useMedicalRecord from '../../hooks/useMedicalRecord'
import FilterableDocumentList from '../FilterableDocumentList'
import DataField from '../FormFields/DataField'
import Header from '../Header'

const SmallTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '2.5rem', // Ajuste de altura para el tamaño pequeño
    fontSize: '1rem' // Tamaño del texto más pequeño
  },
  '& .MuiInputBase-input': {
    padding: '8.5px 14px' // Ajuste del padding para que coincida con size="small"
  },
  '& .MuiInputLabel-root': {
    fontSize: '1rem', // Tamaño del label más pequeño
    transform: 'translate(14px, 8px) scale(1)' // Ajuste de la posición inicial del label
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -8px) scale(0.75)' // Ajuste de la posición del label al encoger
  }
})

export default function MedicalRecordSection() {
  const {
    formData,
    activePatient,
    activeMedicalRecord,
    nextAppointment,
    medicalRecords,
    disabledButtons,
    calculateAge,
    handleField,
    handleDate,
    handleCheckbox,
    handleNewMedicalRecord,
    handleUpdateMedicalRecord,
    handleDeleteMedicalRecord,
    handleMedicalRecordSelection,
    handlePhotoSection
  } = useMedicalRecord()

  return (
    <main className="size-full">
      <form className="flex size-full flex-col items-start justify-start gap-5 rounded-2xl bg-white px-5 py-5">
        <Header
          title="Historia clínica"
          handlers={{
            onNew: handleNewMedicalRecord,
            onUpdate: handleUpdateMedicalRecord,
            onDelete: handleDeleteMedicalRecord
          }}
          disabledButtons={disabledButtons}
        ></Header>
        <div className="flex size-full flex-col items-start justify-start gap-2.5">
          <div className="flex w-full flex-row items-center gap-6">
            <div className="flex grow flex-col items-start justify-start gap-2.5">
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ width: '100%', borderTop: '1px solid', borderColor: 'alice-blue.main' }}
              >
                Identificación
              </Typography>
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="size-full">
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    value={activePatient.name}
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <TextField
                    sx={{ width: '5rem' }}
                    label="Sexo"
                    variant="outlined"
                    value={activePatient.gender}
                    size="small"
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                  <TextField
                    sx={{ width: '6rem' }}
                    label="Edad"
                    variant="outlined"
                    value={calculateAge(dayjs(activePatient.birthdate))}
                    size="small"
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="ID"
                    variant="outlined"
                    value={activePatient.id}
                    size="small"
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2.5">
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ width: '100%', borderTop: '1px solid', borderColor: 'alice-blue.main' }}
              >
                Historia clínica
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <DateTimePicker
                  label="Fecha y hora de elaboración"
                  slots={{ textField: SmallTextField }}
                  value={dayjs(formData.date).isValid() ? dayjs(formData.date) : null}
                  onChange={handleDate}
                  disableFuture
                />
                <TextField
                  label="Próxima cita"
                  size="small"
                  value={nextAppointment?.date ?? 'Sin registro'}
                  readOnly
                />
              </Box>
            </div>
          </div>
          <div className="flex size-full flex-row gap-6">
            <aside className="flex w-56 flex-col">
              <FilterableDocumentList
                title="Historial"
                documents={medicalRecords}
                activeDocument={activeMedicalRecord}
                handleDocSelection={handleMedicalRecordSelection}
              ></FilterableDocumentList>
            </aside>
            <div className="flex h-full grow flex-col gap-5">
              <TextField
                id="record"
                name="record"
                label="Historia clínica"
                variant="outlined"
                value={formData.record}
                onChange={handleField}
                multiline
                rows={6}
                fullWidth
              />
              <TextField
                id="diagnosis"
                name="diagnosis"
                label="Diagnóstico"
                variant="outlined"
                value={formData.diagnosis}
                onChange={handleField}
                multiline
                rows={3}
                fullWidth
              />
              <TextField
                id="treatment"
                name="treatment"
                label="Tratamiento"
                variant="outlined"
                value={formData.treatment}
                onChange={handleField}
                multiline
                rows={3}
                fullWidth
              />
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-5">
                  <ButtonGroup variant="outlined">
                    <Button
                      startIcon={<DescriptionOutlinedIcon />}
                      disabled={disabledButtons?.includes('prescription')}
                    >
                      Receta
                    </Button>
                    <Button
                      startIcon={<PhotoCameraOutlinedIcon />}
                      disabled={disabledButtons?.includes('photos')}
                      onClick={handlePhotoSection}
                    >
                      Fotos
                    </Button>
                  </ButtonGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="firstTime"
                        name="firstTime"
                        checked={formData.firstTime}
                        onChange={handleCheckbox}
                        size="small"
                      ></Checkbox>
                    }
                    label="Primera vez"
                    labelPlacement="end"
                    sx={{
                      '& .MuiTypography-root': { fontSize: '0.875rem', lineHeight: '1.25rem' }
                    }}
                  />
                </div>
                <DataField label="Personal médico responsable">Alejo</DataField>
                {/* <TextField
                  label="Personal médico responsable"
                  variant="standard"
                  value="Alejo"
                  size="small"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
