import styled from '@emotion/styled'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import useMedicalRecord from '../../hooks/useMedicalRecord'
import CrudButtons from '../Buttons/CrudButtons'
import FilterableDocumentList from '../SearchableDocumentList'
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
    <Box component="main" sx={{ width: 1, height: 1 }}>
      <Stack
        component="form"
        direction="column"
        spacing="1.25rem"
        sx={{
          width: 1,
          height: 1,
          justifyContent: 'start',
          alignItems: 'center',
          borderRadius: '1rem',
          backgroundColor: 'white',
          padding: '1.25rem'
        }}
      >
        <Header title="Historia clínica" disableDivider>
          <CrudButtons
            onNew={handleNewMedicalRecord}
            onUpdate={handleUpdateMedicalRecord}
            onDelete={handleDeleteMedicalRecord}
            disabledButtons={disabledButtons}
          ></CrudButtons>
        </Header>
        <Stack
          direction="column"
          spacing="0.625rem"
          sx={{ width: 1, height: 1, justifyContent: 'start', alignItems: 'start' }}
        >
          <Stack direction="row" spacing="1.5rem" sx={{ width: 1, alignItems: 'center' }}>
            <Stack
              direction="column"
              spacing="0.625rem"
              sx={{ flexGrow: 1, justifyContent: 'start', alignItems: 'center' }}
            >
              <Typography
                variant="label"
                sx={{ width: 1, borderTop: '1px solid', borderColor: 'outline.main' }}
              >
                Identificación
              </Typography>
              <Stack
                direction="column"
                spacing="0.625rem"
                sx={{ width: 1, justifyContent: 'start', alignItems: 'start' }}
              >
                <Box sx={{ width: 1, heigth: 1 }}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    value={activePatient.name}
                    size="small"
                    fullWidth
                    slotProps={{ input: { readOnly: true } }}
                  />
                </Box>
                <Stack
                  direction="row"
                  spacing="1rem"
                  sx={{ width: 1, justifyContent: 'start', alignItems: 'center' }}
                >
                  <TextField
                    sx={{ width: '5rem' }}
                    label="Sexo"
                    variant="outlined"
                    value={activePatient.gender}
                    size="small"
                    slotProps={{ input: { readOnly: true } }}
                  />
                  <TextField
                    sx={{ width: '6rem' }}
                    label="Edad"
                    variant="outlined"
                    value={calculateAge(dayjs(activePatient.birthdate))}
                    size="small"
                    slotProps={{ input: { readOnly: true } }}
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="ID"
                    variant="outlined"
                    value={activePatient.id}
                    size="small"
                    slotProps={{ input: { readOnly: true } }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="column" spacing="0.625rem">
              <Typography
                variant="label"
                component="span"
                sx={{ width: 1, borderTop: '1px solid', borderColor: 'outline.main' }}
              >
                Historia clínica
              </Typography>
              <Stack direction="column" spacing="0.625rem">
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
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" spacing="1.5rem" sx={{ width: 1, height: 1 }}>
            <Stack component="aside" direction="column" sx={{ width: '14rem' }}>
              <FilterableDocumentList
                title="Historial"
                documents={medicalRecords}
                activeDocument={activeMedicalRecord}
                handleDocSelection={handleMedicalRecordSelection}
              ></FilterableDocumentList>
            </Stack>
            <Stack direction="column" spacing="1.25rem" sx={{ flexGrow: 1, height: 1 }}>
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
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack
                  direction="row"
                  spacing="1.25rem"
                  sx={{ justifyContent: 'start', alignItems: 'center' }}
                >
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
                </Stack>
                <DataField label="Personal médico responsable">Alejo</DataField>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
