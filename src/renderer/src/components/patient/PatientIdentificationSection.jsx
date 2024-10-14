import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import usePatient from '../../hooks/usePatient'
import { calculateAge } from '../../utils/date'
import ImageField from '../FormFields/ImageField'
import Header from '../Header'
import SideView from '../SideView'

export default function PatientIdentificationSection() {
  const {
    formData,
    errors,
    activePatient,
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
    <>
      <SideView
        documents={patients}
        activeDocument={activePatient}
        handleDocSelection={handlePatientSelection}
      ></SideView>
      <PatientForm
        formData={formData}
        errors={errors}
        disabledButtons={disabledButtons}
        onField={handleField}
        onDate={handleDate}
        onImage={handleImage}
        onNew={handleNewPatient}
        onUpdate={handleUpdatePatient}
        onDelete={handleDeletePatient}
      ></PatientForm>
    </>
  )
}

PatientForm.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
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
  disabledButtons,
  onField,
  onDate,
  onImage,
  onNew,
  onUpdate,
  onDelete
}) {
  return (
    <main className="h-full grow">
      <form className="flex h-full grow flex-col gap-3 rounded-2xl bg-white p-5">
        <Header
          title="Identificación del paciente"
          handlers={{ onNew, onUpdate, onDelete }}
          disabledButtons={disabledButtons}
        ></Header>
        <div className="flex w-full flex-row gap-5">
          <TextField
            id="name"
            name="name"
            label="Nombre"
            variant="outlined"
            value={formData.name}
            onChange={onField}
            error={errors.name}
            helperText={errors.name}
            fullWidth
          />
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
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
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
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
            </FormControl>
          </Box>
        </div>
        <div className="flex w-full flex-row gap-5">
          <DatePicker
            sx={{ minWidth: 250 }}
            label="Fecha de nacimiento"
            value={dayjs(formData.birthdate)}
            onChange={onDate}
            disableFuture
          />
          <TextField
            sx={{ minWidth: 120 }}
            id="age"
            name="age"
            label="Edad"
            variant="outlined"
            value={calculateAge(dayjs(formData.birthdate))}
            slotProps={{
              input: {
                readOnly: true
              }
            }}
          />
          <TextField
            id="id"
            name="id"
            label="ID"
            variant="outlined"
            value={formData.id}
            onChange={onField}
            error={errors.id}
            helperText={errors.id}
            fullWidth
          />
        </div>
        <div className="flex w-full flex-row items-center justify-between gap-5">
          <div className="flex flex-grow flex-col gap-3">
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
          </div>
          <ImageField imageData={formData.image} onImageChange={onImage}></ImageField>
        </div>
        <div className="flex w-full flex-row gap-5">
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
        </div>
      </form>
    </main>
  )
}
