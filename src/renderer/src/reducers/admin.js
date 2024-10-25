export const initialState = {
  formData: {
    username: '',
    name: '',
    role: '',
    password: '',
    confirmPassword: ''
  },
  errors: {}
}

export const ACTIONS = {
  SET_USER: 'SET_USER',
  CLEAR_FORM: 'CLEAR_FORM',
  SET_FIELD: 'SET_FIELD',
  SET_ERRORS: 'SET_ERRORS'
}

export const adminReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER: {
      if (!action.user) return initialState
      return { formData: action.user, errors: {} }
    }
    case ACTIONS.CLEAR_FORM: {
      return initialState
    }
    case ACTIONS.SET_FIELD: {
      const { name, value } = action.field
      const { formData, errors } = state
      const newFormData = { ...formData, [name]: value }
      const newErrors = { ...errors, [name]: null }
      return { formData: newFormData, errors: newErrors }
    }
    case ACTIONS.SET_ERRORS: {
      return { formData: state.formData, errors: action.errors ?? {} }
    }
  }
}
