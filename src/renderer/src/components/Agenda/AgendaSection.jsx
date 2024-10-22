import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { Autocomplete, Box, Button, ButtonGroup, Stack, TextField, Typography } from '@mui/material'
import { DateCalendar, DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import useAgenda from '../../hooks/useAgenda'
import DataField from '../FormFields/DataField'
import Header from '../Header'
import { DocumentList } from '../SearchableDocumentList'
import SideView from '../SideView'

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
  } = useAgenda()

  return (
    <Stack direction="row" spacing="1.25rem" sx={{ width: 1, height: 1 }}>
      <SideView>
        <Box
          sx={{
            width: 1,
            '& .MuiDateCalendar-root': {
              width: 1
            },
            '& .MuiDateCalendar-root .MuiPickersFadeTransitionGroup-root': {
              width: 1
            }
          }}
        >
          <DateCalendar value={selectedDate} onChange={handleDateSelection} />
        </Box>
      </SideView>
      <Box component="main" sx={{ flexGrow: 1, height: 1 }}>
        <Stack
          direction="column"
          spacing="1.25rem"
          sx={{
            width: 1,
            height: 1,
            padding: '1.25rem',
            backgroundColor: 'white',
            borderRadius: '1rem'
          }}
        >
          <Header title="Agenda"></Header>
          <Box spacing="1.25rem" sx={{ width: 1, height: 1 }}>
            <AppointmentList
              appointments={appointments}
              activeAppointment={activeAppointment}
              onSelection={handleAppointmentSelection}
              onDelete={handleDeleteAppointment}
            />
            <Stack
              direction="column"
              spacing="2.5rem"
              sx={{ ...columnStyles, paddingLeft: '0.625rem' }}
            >
              <AppointmentForm
                formData={formData}
                errors={errors}
                patients={patients}
                onField={handleField}
                onSelect={handleSelect}
                onDate={handleDate}
                onNew={handleNewAppointment}
              />
              {activeAppointment && <AppointmentInfo activeAppointment={activeAppointment} />}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}

const columnStyles = {
  display: 'inline-flex',
  width: 0.5,
  height: 1
}

AppointmentList.propTypes = {
  appointments: PropTypes.array,
  activeAppointment: PropTypes.object,
  onSelection: PropTypes.func,
  onDelete: PropTypes.func
}

function AppointmentList({ appointments, activeAppointment, onSelection, onDelete }) {
  return (
    <Stack direction="column" spacing="0.625rem" sx={{ ...columnStyles, paddingRight: '0.625rem' }}>
      <Typography variant="h4">Listado de citas para este día</Typography>
      <ButtonGroup
        sx={{
          width: 1,
          '& .MuiButtonBase-root': {
            width: 1
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
    </Stack>
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
    <Stack component="form" direction="column" spacing="0.625rem">
      <Typography variant="h4">Agendar cita</Typography>
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
    </Stack>
  )
}

AppointmentInfo.propTypes = {
  activeAppointment: PropTypes.object
}

function AppointmentInfo({ activeAppointment }) {
  return (
    <Stack direction="column" spacing="1.25rem">
      <Typography variant="h4">Información de cita</Typography>
      <Stack direction="column" spacing="0.625rem">
        <DataField label="Cita para">{activeAppointment.patientName}</DataField>
        <DataField label="Fecha y hora">{activeAppointment.date}</DataField>
        <DataField label="Motivo de consulta">{activeAppointment.reason}</DataField>
      </Stack>
    </Stack>
  )
}
