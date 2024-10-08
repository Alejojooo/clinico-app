import { useContext, useEffect, useReducer, useState, useRef } from 'react'
import { PatientContext } from '../context/patient'
import { initialState, ACTIONS, patientReducer } from '../reducers/patient'
import { clean } from '../utils/form'
import { useView } from './useView'

export default function usePatient() {
  const context = useContext(PatientContext)
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider')
  }

  const { activePatient, setActivePatient } = context
  const { addSnackbar, removeSnackbar } = useView()
  const [patients, setPatients] = useState([])
  const [state, dispatch] = useReducer(patientReducer, initialState)

  const originalData = useRef(null)
  const updateFinished = useRef(true)
  const snackbarId = useRef(null)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_PATIENT, patient: activePatient })
  }, [activePatient])

  useEffect(() => {
    getPatients()
  }, [])

  const showPersistentSnackbar = (message) => {
    snackbarId.current = addSnackbar(message, true)
    updateFinished.current = false
  }

  const clearPersistentSnackbar = () => {
    updateFinished.current = true
    if (snackbarId.current) {
      removeSnackbar(snackbarId.current, 1)
      snackbarId.current = null
    }
  }

  const getPatients = async () => {
    const newPatients = await window.patient.getPatients()
    setPatients(newPatients)
  }

  const handleField = (e) => {
    if (originalData !== state.formData && updateFinished.current && activePatient)
      showPersistentSnackbar('Hay cambios no guardados')
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: e.target })
  }

  const handleImage = (image) => {
    const event = { target: { name: 'image', value: image } }
    handleField(event)
  }

  const getCleanForm = () => {
    const newForm = clean(state.formData)
    delete newForm.age
    return newForm
  }

  const handleNewPatient = async () => {
    if (activePatient) {
      dispatch({ type: ACTIONS.CLEAR_FORM })
      setActivePatient(null)
      clearPersistentSnackbar()
      showPersistentSnackbar('Se va a crear un nuevo paciente')
      console.log('active:', activePatient)
      return
    }

    const { outcome, payload } = await window.patient.newPatient(getCleanForm())
    if (outcome === 'success') {
      setActivePatient(payload)
      clearPersistentSnackbar()
      addSnackbar('Se creó un nuevo paciente')
      await getPatients()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
      addSnackbar('Ocurrió un error al crear un nuevo paciente')
    }
  }

  const handleUpdatePatient = async () => {
    if (!activePatient) {
      addSnackbar('Primero seleccione a un paciente')
      return
    }
    if (originalData.current === state.formData) {
      addSnackbar('No hay cambios que guardar')
      return
    }

    const { outcome, payload } = await window.patient.updatePatient(
      activePatient._id,
      getCleanForm()
    )
    if (outcome === 'success') {
      addSnackbar('Se actualizó el paciente')
      clearPersistentSnackbar()
      await getPatients()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
      addSnackbar('Ocurrió un error al actualizar el paciente')
    }
  }

  const handleDeletePatient = async () => {
    if (!activePatient) {
      addSnackbar('Primero seleccione a un paciente')
      return
    }
    const option = await window.dialog.showConfirmDialog(
      'Eliminar paciente',
      '¿Está seguro de eliminar este paciente?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActivePatient(null)
      await window.patient.deletePatient(activePatient._id)
      addSnackbar('Se eliminó el paciente')
      getPatients()
    }
  }

  const handlePatientSelection = async (id) => {
    const patient = await window.patient.getPatientById(id)
    originalData.current = patient
    setActivePatient(patient)
    clearPersistentSnackbar()
  }

  const getDisabledButtons = () => {
    if (!activePatient) return ['update', 'delete']
    else return []
  }

  return {
    formData: state.formData,
    errors: state.errors,
    activePatient,
    disabledButtons: getDisabledButtons(),
    patients,
    handleField,
    handleImage,
    handleNewPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handlePatientSelection
  }
}
