// 1. Estado inicial
export const initialState = {
  formData: {
    name: '',
    gender: '',
    maritalStatus: '',
    birthdate: null,
    id: '',
    insurance: '',
    image: '',
    email: '',
    home: '',
    phone: '',
    otherData: ''
  },
  errors: {}
}

export const ACTIONS = {
  SET_PATIENT: 'SET_PATIENT',
  SET_ERRORS: 'SET_ERRORS',
  CLEAR_FORM: 'CLEAR_FORM',
  FIELD_CHANGE: 'FIELD_CHANGE'
}

// 2. Función reductora
export const patientReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PATIENT: {
      if (!action.patient) return initialState
      const newPatient = action.patient
      return { formData: newPatient, errors: {} }
    }
    case ACTIONS.SET_ERRORS: {
      return { formData: state.formData, errors: action.errors ?? {} }
    }
    case ACTIONS.CLEAR_FORM: {
      return initialState
    }
    case ACTIONS.FIELD_CHANGE: {
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
    case 'id': {
      const newValue = value.toUpperCase().replace(/\W+/, '')
      return { [name]: newValue }
    }
    default: {
      return { [name]: value }
    }
  }
}
