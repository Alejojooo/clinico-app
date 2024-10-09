// 1. Estado inicial
export const initialState = {
  formData: {
    name: '',
    image: ''
  }
}

export const ACTIONS = {
  SET_IMAGE: 'SET_MEDICAL_RECORD',
  CLEAR_FORM: 'CLEAR_FORM',
  FIELD_CHANGE: 'FIELD_CHANGE'
}

// 2. Función reductora
export const medicalRecordReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IMAGE: {
      if (!action.medicalRecord) return initialState
      return { formData: action.medicalRecord }
    }
    case ACTIONS.CLEAR_FORM: {
      return initialState
    }
    case ACTIONS.FIELD_CHANGE: {
      const { name, value } = action.field
      const { formData } = state
      const newFormData = {
        ...formData,
        [name]: value
      }
      return { formData: newFormData }
    }
  }
  throw new Error('Unknown action: ' + action.type)
}
