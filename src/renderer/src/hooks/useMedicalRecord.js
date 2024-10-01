import { useContext, useEffect, useReducer, useState } from 'react'
import { MedicalRecordContext } from '../context/medicalRecord'
import { ACTIONS, initialState, medicalRecordReducer } from '../reducers/medicalRecord'
import { calculateAge } from '../utils/date'
import { clean } from '../utils/form'
import usePatient from './usePatient'
import { useView } from './useView'

export default function useMedicalRecord() {
  const context = useContext(MedicalRecordContext)
  if (context === undefined) {
    throw new Error('useMedicalRecord must be used within a MedicalRecordProvider')
  }

  const { activePatient } = usePatient()
  const { addSnackbar } = useView()
  const { activeMedicalRecord, setActiveMedicalRecord } = context
  const [medicalRecords, setMedicalRecords] = useState([])
  const [state, dispatch] = useReducer(medicalRecordReducer, initialState)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_MEDICAL_RECORD, medicalRecord: activeMedicalRecord })
  }, [activeMedicalRecord])

  useEffect(() => {
    getMedicalRecords()
  }, [])

  const getMedicalRecords = async () => {
    const newMedicalRecords = await window.medicalRecord.getMedicalRecords(activePatient._id)
    setMedicalRecords(newMedicalRecords)
  }

  const handleField = (e) => {
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: e.target })
  }

  const handleCheckbox = (e) => {
    dispatch({
      type: ACTIONS.FIELD_CHANGE,
      field: { name: e.target.name, value: e.target.checked }
    })
  }

  const getCleanForm = () => {
    const newForm = clean(state.formData)
    if (!newForm.date) newForm.date = new Date().toISOString()
    return newForm
  }

  const handleNewMedicalRecord = async () => {
    if (activeMedicalRecord) {
      addSnackbar('Se va a crear una nueva historia clínica')
      dispatch({ type: ACTIONS.CLEAR_FORM })
      setActiveMedicalRecord(null)
      return
    }

    const newFormData = { ...getCleanForm(), patientId: activePatient._id }
    const { outcome, payload } = await window.medicalRecord.newMedicalRecord(newFormData)
    if (outcome === 'success') {
      addSnackbar(
        `Se creó una nueva historia clínica${!state.formData.date ? ' con la fecha de hoy' : ''}`
      )
      setActiveMedicalRecord(payload)
      await getMedicalRecords()
    }
  }

  const handleUpdateMedicalRecord = async () => {
    if (!activeMedicalRecord) {
      addSnackbar('Primero seleccione una historia clínica')
      return
    }

    const newFormData = { ...getCleanForm(), patientId: activePatient._id }
    const { outcome } = await window.medicalRecord.updateMedicalRecord(
      activeMedicalRecord._id,
      newFormData
    )
    if (outcome === 'success') {
      addSnackbar('Se actualizó la historia clínica')
      await getMedicalRecords()
    }
  }

  const handleDeleteMedicalRecord = async () => {
    if (!activeMedicalRecord) {
      addSnackbar('Primero seleccione una historia clínica')
      return
    }

    const option = await window.dialog.showConfirmDialog(
      'Eliminar historia clínica',
      '¿Está seguro de eliminar esta historia clínica?'
    )
    if (option === window.dialog.OK_OPTION) {
      addSnackbar('Se eliminó la historia clínica')
      await window.medicalRecord.deleteMedicalRecord(activeMedicalRecord._id)
      setActiveMedicalRecord(null)
      getMedicalRecords()
    }
  }

  const handleMedicalRecordSelection = async (id) => {
    const medicalRecord = await window.medicalRecord.getMedicalRecordById(id)
    setActiveMedicalRecord(medicalRecord)
  }

  return {
    formData: state.formData,
    activePatient,
    activeMedicalRecord,
    medicalRecords,
    calculateAge,
    handleField,
    handleCheckbox,
    handleNewMedicalRecord,
    handleUpdateMedicalRecord,
    handleDeleteMedicalRecord,
    handleMedicalRecordSelection
  }
}
