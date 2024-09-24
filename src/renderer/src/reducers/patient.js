import { DateTime, Interval } from 'luxon'

// 1. Estado inicial
export const initialPatientFormData = {
  name: '',
  gender: '',
  maritalStatus: '',
  birthdate: '',
  age: '',
  id: '',
  image: '',
  insurance: '',
  email: '',
  home: '',
  phone: '',
  otherData: ''
}

// 2. Función reductora
export const patientReducer = (state, action) => {
  switch (action.type) {
    case 'patient': {
      if (!action.patient) return { formData: initialPatientFormData, errors: {} }
      const newPatient = action.patient
      newPatient.age = calculateAge(newPatient.birthdate)
      return { formData: newPatient, errors: {} }
    }
    case 'clear-form': {
      return { formData: initialPatientFormData, errors: {} }
    }
    case 'new-patient':
    case 'update-patient': {
      return { formData: state.formData, errors: action.errors ?? {} }
    }
    case 'field-change': {
      const { name, value } = action.field
      const { formData, errors } = state
      const newFieldValues = handleField(name, value)
      const newFormData = {
        ...formData,
        ...newFieldValues
      }
      const newErrors = {
        ...errors,
        [name]: null
      }
      return { formData: newFormData, errors: newErrors }
    }
  }
  throw new Error('Unknown action: ' + action.type)
}

const handleField = (name, value) => {
  switch (name) {
    case 'gender': {
      let newValue = value.toUpperCase()
      if (!['M', 'F'].includes(newValue)) newValue = ''
      return { [name]: newValue }
    }
    case 'maritalStatus': {
      let newValue = value.toUpperCase()
      if (!['S', 'C', 'D', 'V', 'U'].includes(newValue)) newValue = ''
      return { [name]: newValue }
    }
    case 'birthdate': {
      const date = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
      const age = date.isValid ? calculateAge(value) : ''
      return { [name]: value, age: age }
    }
    case 'id': {
      const newValue = value.toUpperCase().replace(/\W+/, '')
      return { [name]: newValue }
    }
    default: {
      return { [name]: value }
    }
  }
}

const calculateAge = (value) => {
  if (!value) return ''
  const birthdate = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
  const duration = Interval.fromDateTimes(birthdate, DateTime.now())
    .toDuration(['years', 'months', 'days'])
    .toObject()
  if (Object.keys(duration).length === 0) return '0a'
  // De 0 a 1 año se cuentan los meses y días
  // De 1 a 12 años se cuentan los años y meses
  // A partir de los 13 años se dejan de contar los meses
  if (duration.years >= 13) return `${duration.years}a`
  else if (duration.years >= 1) return `${duration.years}a ${duration.months}m`
  else return `${duration.months}m ${Math.floor(duration.days)}d`
}
