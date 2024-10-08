import { useContext, useEffect, useReducer, useState } from 'react'
import { PatientContext } from '../context/patient'
import { initialState, ACTIONS, patientReducer } from '../reducers/patient'
import { clean } from '../utils/form'
import useSnackbar from './useSnackbar'
import useFormChanged from './useFormChanged'

export default function usePatient() {
  const context = useContext(PatientContext)
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider')
  }

  const [patients, setPatients] = useState([])
  const [state, dispatch] = useReducer(patientReducer, initialState)
  const { activePatient, setActivePatient } = context
  const { showSnackbar, showPersistentSnackbar, clearPersistentSnackbar } = useSnackbar()
  const { hasChanged, setOriginalData } = useFormChanged(state.formData)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_PATIENT, patient: activePatient })
  }, [activePatient])

  useEffect(() => {
    getPatients()
  }, [])

  const getPatients = async () => {
    const newPatients = await window.patient.getPatients()
    setPatients(newPatients)
  }

  const handleField = (e) => {
    if (activePatient && hasChanged) showPersistentSnackbar('Hay cambios no guardados')
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
      showPersistentSnackbar('Se va a crear un nuevo paciente')
      console.log('active:', activePatient)
      return
    }

    const { outcome, payload } = await window.patient.newPatient(getCleanForm())
    console.log('outcome', outcome, 'payload', payload)
    if (outcome === 'success') {
      setActivePatient(payload)
      showSnackbar('Se creó un nuevo paciente', true)
      await getPatients()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
      showSnackbar('Ocurrió un error al crear un nuevo paciente')
    }
  }

  const handleUpdatePatient = async () => {
    if (!activePatient) {
      showSnackbar('Primero seleccione a un paciente')
      return
    }
    if (!hasChanged) {
      showSnackbar('No hay cambios que guardar')
      return
    }

    const { outcome, payload } = await window.patient.updatePatient(
      activePatient._id,
      getCleanForm()
    )
    if (outcome === 'success') {
      showSnackbar('Se actualizó el paciente', true)
      await getPatients()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
      showSnackbar('Ocurrió un error al actualizar el paciente')
    }
  }

  const handleDeletePatient = async () => {
    if (!activePatient) {
      showSnackbar('Primero seleccione a un paciente')
      return
    }
    const option = await window.dialog.showConfirmDialog(
      'Eliminar paciente',
      '¿Está seguro de eliminar este paciente?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActivePatient(null)
      await window.patient.deletePatient(activePatient._id)
      showSnackbar('Se eliminó el paciente')
      getPatients()
    }
  }

  const handlePatientSelection = async (id) => {
    const patient = await window.patient.getPatientById(id)
    setOriginalData(patient)
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
