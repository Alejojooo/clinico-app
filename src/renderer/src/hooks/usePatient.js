import { useContext, useEffect, useReducer, useState } from 'react'
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
  const { addSnackbar } = useView()
  const [patients, setPatients] = useState([])
  const [state, dispatch] = useReducer(patientReducer, initialState)

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
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: e.target })
  }

  const handleImage = (image) => {
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: { name: 'image', value: image } })
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
      addSnackbar('Se va a crear un nuevo paciente')
      return
    }

    const { outcome, payload } = await window.patient.newPatient(getCleanForm())
    if (outcome === 'success') {
      setActivePatient(payload)
      await getPatients()
      addSnackbar('Se creó un nuevo paciente')
    } else {
      addSnackbar('Ocurrió un error al crear un nuevo paciente')
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
    }
  }

  const handleUpdatePatient = async () => {
    if (!activePatient) {
      addSnackbar('Primero seleccione a un paciente')
      return
    }

    console.log(getCleanForm())
    const { outcome, payload } = await window.patient.updatePatient(
      activePatient._id,
      getCleanForm()
    )
    if (outcome === 'success') {
      addSnackbar('Se actualizó el paciente')
      await getPatients()
    } else {
      addSnackbar('Ocurrió un error al actualizar el paciente')
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
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
      addSnackbar('Se eliminó el paciente')
      await window.patient.deletePatient(activePatient._id)
      setActivePatient(null)
      getPatients()
    }
  }

  const handlePatientSelection = async (id) => {
    const patient = await window.patient.getPatientById(id)
    setActivePatient(patient)
  }

  return {
    formData: state.formData,
    errors: state.errors,
    activePatient,
    patients,
    handleField,
    handleImage,
    handleNewPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handlePatientSelection
  }
}
