import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { Autocomplete, Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { DateCalendar, DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import useAppointment from '../../hooks/useAppointment'
import { DocumentList } from '../FilterableDocumentList'
import SideView from '../SideView'
import DataField from '../FormFields/DataField'

// TODO: Agregar alertas de cuántas citas son para hoy
// TODO: Funcionalidad de ver paciente

export default function AgendaSection() {
  const {
    formData,
    errors,
    activeAppointment,
    appointments,
    patients,
    selectedDate,
    handleField,
    handleSelect,
    handleDate,
    handleDateSelection,
    handleNewAppointment,
    handleDeleteAppointment,
    handleAppointmentSelection
  } = useAppointment()

  return (
    <>
      <SideView>
        <Box
          sx={{
            width: '100%',
            // backgroundColor: 'alice-blue.main',
            // borderRadius: '0.25rem',
            '& .MuiDateCalendar-root': {
              width: '100%'
            },
            '& .MuiDateCalendar-root .MuiPickersFadeTransitionGroup-root': {
              width: '100%'
            }
          }}
        >
          <DateCalendar value={selectedDate} onChange={handleDateSelection} />
        </Box>
      </SideView>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          backgroundColor: 'white',
          borderRadius: '1rem'
        }}
        component="main"
      >
        <AppointmentList
          appointments={appointments}
          activeAppointment={activeAppointment}
          onSelection={handleAppointmentSelection}
          onDelete={handleDeleteAppointment}
        ></AppointmentList>
        <Box sx={{ ...flexColumn, width: '50%', gap: '2.5rem' }}>
          <AppointmentForm
            formData={formData}
            errors={errors}
            patients={patients}
            onField={handleField}
            onSelect={handleSelect}
            onDate={handleDate}
            onNew={handleNewAppointment}
          ></AppointmentForm>
          {activeAppointment && (
            <AppointmentInfo activeAppointment={activeAppointment}></AppointmentInfo>
          )}
        </Box>
      </Box>
    </>
  )
}

const flexColumn = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
  padding: '1.25rem'
}

AppointmentList.propTypes = {
  appointments: PropTypes.array,
  activeAppointment: PropTypes.object,
  onSelection: PropTypes.func,
  onDelete: PropTypes.func
}

function AppointmentList({ appointments, activeAppointment, onSelection, onDelete }) {
  return (
    <Box sx={{ ...flexColumn, width: '50%', height: '100%' }}>
      <Typography variant="subtitle1" component="h4" sx={{ fontWeight: '600' }}>
        Listado de citas para este día
      </Typography>
      <ButtonGroup
        sx={{
          width: '100%',
          '& .MuiButtonBase-root': {
            width: '100%'
          }
        }}
        variant="outlined"
      >
        <Button startIcon={<EventBusyOutlinedIcon />} onClick={onDelete}>
          Eliminar
        </Button>
        <Button startIcon={<PersonOutlinedIcon />}>Ver Paciente</Button>
      </ButtonGroup>
      <DocumentList
        documents={appointments}
        activeDocument={activeAppointment}
        handleDocSelection={onSelection}
      ></DocumentList>
    </Box>
  )
}

AppointmentForm.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
  patients: PropTypes.array,
  onField: PropTypes.func,
  onSelect: PropTypes.func,
  onDate: PropTypes.func,
  onNew: PropTypes.func
}

function AppointmentForm({ formData, errors, patients, onField, onSelect, onDate, onNew }) {
  return (
    <Box component="form" sx={{ ...flexColumn, gap: '0.625rem', padding: 0 }}>
      <Typography variant="subtitle1" component="h4" sx={{ fontWeight: '600' }}>
        Agendar cita
      </Typography>
      <Autocomplete
        id="patient"
        name="patient"
        options={patients}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errors.patientId ? true : false}
            helperText={errors.patientId}
            label="Cita para"
          />
        )}
        onChange={onSelect}
        disablePortal
        fullWidth
      />
      <DateTimePicker
        id="date"
        name="date"
        label="Fecha y hora"
        value={dayjs(formData.date).isValid() ? dayjs(formData.date) : null}
        onChange={onDate}
        slotProps={{
          textField: {
            error: errors.date ? true : false,
            helperText: errors.date
          }
        }}
      />
      <TextField
        id="reason"
        name="reason"
        label="Motivo de consulta"
        variant="outlined"
        value={formData.reason}
        onChange={onField}
        error={errors.reason ? true : false}
        helperText={errors.reason}
        fullWidth
      />
      <Button
        variant="contained"
        startIcon={<EventAvailableOutlinedIcon />}
        onClick={onNew}
        sx={{ width: 'max-content', alignSelf: 'center' }}
      >
        Agendar cita
      </Button>
    </Box>
  )
}

AppointmentInfo.propTypes = {
  activeAppointment: PropTypes.object
}

function AppointmentInfo({ activeAppointment }) {
  return (
    <Box sx={{ ...flexColumn, gap: '1.25rem', padding: 0 }}>
      <Typography variant="subtitle1" component="h4" sx={{ fontWeight: '600' }}>
        Información de cita
      </Typography>
      <Box sx={{ ...flexColumn, padding: 0 }}>
        <DataField label="Cita para">{activeAppointment.patientName}</DataField>
        <DataField label="Fecha y hora">{activeAppointment.date}</DataField>
        <DataField label="Motivo de consulta">{activeAppointment.reason}</DataField>
      </Box>
    </Box>
  )
}
