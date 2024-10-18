export const initialState = {
  formData: {
    patientId: null,
    date: null,
    reason: ''
  },
  errors: {}
}

export const ACTIONS = {
  SET_APPOINTMENT: 'SET_DRUG',
  SET_ERRORS: 'SET_ERRORS',
  CLEAR_FORM: 'CLEAR_FORM',
  FIELD_CHANGE: 'FIELD_CHANGE'
}

export const appointmentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_APPOINTMENT: {
      const newAppointment = action.appointment
      if (newAppointment) return { formData: newAppointment, errors: {} }
      else return initialState
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
      const newFormData = {
        ...formData,
        [name]: value
      }
      const newErrors = {
        ...errors,
        [name]: null
      }
      return { formData: newFormData, errors: newErrors }
    }
  }
}
