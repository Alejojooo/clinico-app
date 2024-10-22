import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import usePatient from '../../hooks/usePatient'
import { calculateAge } from '../../utils/date'
import CrudButtons from '../Buttons/CrudButtons'
import SearchableDocumentList from '../SearchableDocumentList'
import ImageField from '../FormFields/ImageField'
import Header from '../Header'
import SideView from '../SideView'

export default function PatientIdentificationSection() {
  const {
    formData,
    errors,
    activePatient,
    nextAppointment,
    patients,
    disabledButtons,
    handleField,
    handleDate,
    handleImage,
    handleNewPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handlePatientSelection
  } = usePatient()

  return (
    <Stack direction="row" spacing="1.25rem" sx={{ width: 1, height: 1 }}>
      <SideView>
        <SearchableDocumentList
          title="Listado de pacientes"
          documents={patients}
          activeDocument={activePatient}
          handleDocSelection={handlePatientSelection}
        ></SearchableDocumentList>
      </SideView>
      <PatientForm
        formData={formData}
        errors={errors}
        nextAppointment={nextAppointment}
        disabledButtons={disabledButtons}
        onField={handleField}
        onDate={handleDate}
        onImage={handleImage}
        onNew={handleNewPatient}
        onUpdate={handleUpdatePatient}
        onDelete={handleDeletePatient}
      ></PatientForm>
    </Stack>
  )
}

PatientForm.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
  nextAppointment: PropTypes.object,
  disabledButtons: PropTypes.array,
  onField: PropTypes.func,
  onDate: PropTypes.func,
  onImage: PropTypes.func,
  onNew: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

function PatientForm({
  formData,
  errors,
  nextAppointment,
  disabledButtons,
  onField,
  onDate,
  onImage,
  onNew,
  onUpdate,
  onDelete
}) {
  return (
    <Box component="main" sx={{ height: 1, flexGrow: 1 }}>
      <Stack
        component="form"
        direction="column"
        spacing="0.75rem"
        sx={{ height: 1, borderRadius: '1rem', backgroundColor: 'white', padding: '1.25rem' }}
      >
        <Header title="Identificación del paciente">
          <CrudButtons
            onNew={onNew}
            onUpdate={onUpdate}
            onDelete={onDelete}
            disabledButtons={disabledButtons}
          />
        </Header>
        <Stack direction="row" spacing="1.25rem" sx={{ width: 1 }}>
          <TextField
            id="name"
            name="name"
            label="Nombre"
            variant="outlined"
            value={formData.name}
            onChange={onField}
            error={errors.name ? true : false}
            helperText={errors.name}
            fullWidth
          />
          <Box sx={{ minWidth: 150 }}>
            <FormControl error={errors.gender ? true : false} fullWidth>
              <InputLabel id="gender-label">Sexo</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formData.gender}
                label="Sexo"
                onChange={onField}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
              {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150 }}>
            <FormControl error={errors.maritalStatus ? true : false} fullWidth>
              <InputLabel id="maritalStatus-label">Estado civil</InputLabel>
              <Select
                labelId="maritalStatus-label"
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                label="Estado civil"
                onChange={onField}
              >
                <MenuItem value="S">Solter{formData.gender === 'F' ? 'a' : 'o'}</MenuItem>
                <MenuItem value="C">Casad{formData.gender === 'F' ? 'a' : 'o'}</MenuItem>
                <MenuItem value="V">Viud{formData.gender === 'F' ? 'a' : 'o'}</MenuItem>
                <MenuItem value="D">Divorciad{formData.gender === 'F' ? 'a' : 'o'}</MenuItem>
                <MenuItem value="U">Unión libre</MenuItem>
              </Select>
              {errors.maritalStatus && <FormHelperText>{errors.maritalStatus}</FormHelperText>}
            </FormControl>
          </Box>
        </Stack>
        <Stack direction="row" spacing="1.25rem" sx={{ width: 1 }}>
          <DatePicker
            sx={{ flexShrink: 0, maxWidth: 250 }}
            label="Fecha de nacimiento"
            value={dayjs(formData.birthdate).isValid() ? dayjs(formData.birthdate) : null}
            onChange={onDate}
            disableFuture
          />
          <TextField
            sx={{ flexShrink: 0, maxWidth: 120 }}
            id="age"
            name="age"
            label="Edad"
            variant="outlined"
            value={calculateAge(dayjs(formData.birthdate))}
            slotProps={{ input: { readOnly: true } }}
          />
          <TextField
            sx={{ flexGrow: 1 }}
            id="id"
            name="id"
            label="ID"
            variant="outlined"
            value={formData.id}
            onChange={onField}
            error={errors.id}
            helperText={errors.id}
          />
        </Stack>
        <Stack
          direction="row"
          spacing="1.25rem"
          sx={{ width: 1, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Stack direction="column" spacing="0.75rem" sx={{ flexGrow: 1 }}>
            <TextField
              id="insurance"
              name="insurance"
              label="Aseguradora"
              variant="outlined"
              value={formData.insurance}
              onChange={onField}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={onField}
              fullWidth
            />
            <TextField
              id="home"
              name="home"
              label="Domicilio"
              variant="outlined"
              value={formData.home}
              onChange={onField}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
          <ImageField imageData={formData.image} onImageChange={onImage}></ImageField>
        </Stack>
        <Stack direction="row" spacing="1.25rem" sx={{ width: 1 }}>
          <TextField
            id="phone"
            name="phone"
            label="Teléfonos"
            variant="outlined"
            value={formData.phone}
            onChange={onField}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            id="otherData"
            name="otherData"
            label="Otros datos"
            variant="outlined"
            value={formData.otherData}
            onChange={onField}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
        <TextField
          label="Próxima cita"
          sx={{ flexShrink: 0, maxWidth: 250 }}
          value={nextAppointment?.date ?? 'Sin registro'}
          readOnly
        ></TextField>
      </Stack>
    </Box>
  )
}
