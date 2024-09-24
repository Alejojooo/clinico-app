import { useContext, useEffect, useReducer, useState } from 'react'
import { PatientContext } from '../context/patient'
import { initialPatientFormData, patientReducer } from '../reducers/patient'

export default function usePatient() {
  const context = useContext(PatientContext)
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider')
  }
  const { activePatient, setActivePatient } = context

  const [patients, setPatients] = useState([])
  const [renderConfirmationScreen, setRenderConfirmationScreen] = useState(false)

  const [state, dispatch] = useReducer(patientReducer, {
    formData: initialPatientFormData,
    errors: {}
  })

  useEffect(() => {
    dispatch({ type: 'patient', patient: activePatient })
  }, [activePatient])

  useEffect(() => {
    getPatients()
  }, [])

  const getPatients = async () => {
    const newPatients = await window.database.getPatients()
    setPatients(newPatients)
  }

  const handleField = (e) => {
    dispatch({ type: 'field-change', field: e.target })
  }

  const handleImage = (image) => {
    dispatch({ type: 'field-change', field: { name: image, value: image } })
  }

  const handleNewPatient = async () => {
    if (activePatient) {
      dispatch({ type: 'new-patient' })
      setActivePatient(null)
    } else {
      const [patient, errors] = await window.database.newPatient(state.formData)
      dispatch({ type: 'new-patient', errors: errors })
      if (patient) {
        setActivePatient(patient)
        await getPatients()
      }
    }
  }

  const handleUpdatePatient = async () => {
    if (!activePatient) return
    const errors = await window.database.updatePatient(activePatient._id, state.formData)
    dispatch({ type: 'update-patient', errors: errors })
    await getPatients()
  }

  const handleDeletePatient = async (option) => {
    if (!activePatient) return
    switch (option) {
      case 'ok':
        await window.database.deletePatient(activePatient._id)
        setActivePatient(null)
        setRenderConfirmationScreen(false)
        getPatients()
        break
      case 'cancel':
        setRenderConfirmationScreen(false)
        break
      default:
        setRenderConfirmationScreen(true)
        break
    }
  }

  const handlePatientSelection = async (id) => {
    const patient = await window.database.getPatientById(id)
    setActivePatient(patient)
  }

  return {
    formData: state.formData,
    errors: state.errors,
    activePatient,
    patients,
    renderConfirmationScreen,
    handleField,
    handleImage,
    handleNewPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handlePatientSelection
  }
}
