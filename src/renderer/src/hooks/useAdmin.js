import { useEffect, useReducer, useState } from 'react'
import useSnackbar from './useSnackbar'
import { ACTIONS, adminReducer, initialState } from '../reducers/admin'

export const VIEWS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  LIST: 'LIST'
}

const TITLES = {
  [VIEWS.CREATE]: 'Crear usuario',
  [VIEWS.UPDATE]: 'Actualizar usuario',
  [VIEWS.CHANGE_PASSWORD]: 'Cambiar contraseña',
  [VIEWS.LIST]: 'Usuarios'
}

export default function useAdmin() {
  const [view, setView] = useState(VIEWS.LIST)
  const [activeUser, setActiveUser] = useState(null)
  const [users, setUsers] = useState([])
  const [userState, dispatch] = useReducer(adminReducer, initialState)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (view === VIEWS.LIST) getUsers()
  }, [view])

  const getUsers = async () => {
    const users = await window.user.getUsers()
    setUsers(users)
  }

  const handleCreateView = () => {
    dispatch({ type: ACTIONS.CLEAR_FORM })
    setView(VIEWS.CREATE)
  }

  const handleUpdateView = () => {
    dispatch({ type: ACTIONS.SET_USER, user: activeUser })
    setView(VIEWS.UPDATE)
  }

  const handleChangePasswordView = () => {
    dispatch({ type: ACTIONS.CLEAR_FORM })
    setView(VIEWS.CHANGE_PASSWORD)
  }

  const handleListView = () => {
    dispatch({ type: ACTIONS.CLEAR_FORM })
    setView(VIEWS.LIST)
  }

  const getDisabledButtons = () => {
    if (!activeUser) return ['update', 'delete', 'changePassword']
    return []
  }

  const handleField = (e) => {
    dispatch({ type: ACTIONS.SET_FIELD, field: e.target })
  }

  const handleSaveNew = async () => {
    const { outcome, payload } = await window.user.newUser(userState.formData)
    if (outcome === 'success') {
      handleListView()
      showSnackbar('Se creó un nuevo usuario con éxito')
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
    }
  }

  const handleSaveUpdate = async () => {
    const { outcome, payload } = await window.user.updateUser(activeUser._id, userState.formData)
    if (outcome === 'success') {
      handleListView()
      setActiveUser(payload)
      showSnackbar('Se actualizó el usuario con éxito')
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
    }
  }

  const handleSavePassword = async () => {
    const { outcome, payload } = await window.user.updatePassword(
      activeUser._id,
      userState.formData
    )
    console.log(outcome, payload)
    if (outcome === 'success') {
      handleListView()
      showSnackbar('Se actualizó la contraseña con éxito')
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
    }
  }

  const handleDelete = async () => {
    const option = await window.dialog.showConfirmDialog(
      'Eliminar usuario',
      '¿Está seguro de eliminar este usuario?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActiveUser(null)
      await window.user.deleteUser(activeUser._id)
      await getUsers()
      showSnackbar('Se eliminó el paciente')
    }
  }

  const handleCancel = () => {
    dispatch({ type: ACTIONS.CLEAR_FORM })
    setView(VIEWS.LIST)
  }

  const handleUserSelection = async (id) => {
    const user = await window.user.getUserById(id)
    setActiveUser(user)
  }

  return {
    title: TITLES[view],
    view,
    activeUser,
    users,
    formData: userState.formData,
    errors: userState.errors,
    disabledButtons: getDisabledButtons(),
    handleCreateView,
    handleUpdateView,
    handleChangePasswordView,
    handleField,
    handleSaveNew,
    handleSaveUpdate,
    handleSavePassword,
    handleDelete,
    handleCancel,
    handleUserSelection
  }
}
