import dayjs from 'dayjs'
import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { MedicalRecordContext } from '../context/medicalRecord'
import { ACTIONS, initialState, medicalRecordReducer } from '../reducers/medicalRecord'
import { calculateAge } from '../utils/date'
import { clean } from '../utils/form'
import { PATIENT_SECTIONS } from '../utils/view'
import useFormChanged from './useFormChanged'
import usePatient from './usePatient'
import useSnackbar from './useSnackbar'
import useView from './useView'
import useUser from './useUser'

export default function useMedicalRecord() {
  const context = useContext(MedicalRecordContext)
  if (context === undefined) {
    throw new Error('useMedicalRecord must be used within a MedicalRecordProvider')
  }

  const [medicalRecords, setMedicalRecords] = useState([])
  const [state, dispatch] = useReducer(medicalRecordReducer, initialState)
  const { activePatient, nextAppointment } = usePatient()
  const { setActiveSection } = useView()
  const { currentUser } = useUser()
  const { activeMedicalRecord, setActiveMedicalRecord } = context
  const { showSnackbar, showPersistentSnackbar, clearPersistentSnackbar } = useSnackbar()
  const { hasChanged, setOriginalData } = useFormChanged(state.formData)

  const messageSent = useRef(false)

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
    if (activeMedicalRecord && hasChanged && !messageSent.current) {
      showPersistentSnackbar('Hay cambios no guardados')
      messageSent.current = true
    }
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: e.target })
  }

  const handleDate = (value) => {
    const event = { target: { name: 'date', value: value } }
    handleField(event)
  }

  const handleCheckbox = (e) => {
    const event = { target: { name: e.target.name, value: e.target.checked } }
    handleField(event)
  }

  const getCleanForm = () => {
    const newForm = clean(state.formData)
    if (!newForm.date) {
      newForm.date = new Date().toISOString()
    } else if (newForm.date instanceof dayjs) {
      newForm.date = newForm.date.format()
    }
    newForm.patientId = activePatient._id
    newForm.responsibleMedicalStaff = currentUser.name

    return newForm
  }

  const handleNewMedicalRecord = async () => {
    if (activeMedicalRecord) {
      dispatch({ type: ACTIONS.CLEAR_FORM })
      setActiveMedicalRecord(null)
      showPersistentSnackbar('Se va a crear una nueva historia clínica')
      return
    }

    const newFormData = getCleanForm()
    const { outcome, payload } = await window.medicalRecord.newMedicalRecord(newFormData)
    if (outcome === 'success') {
      setActiveMedicalRecord(payload)
      showSnackbar(
        `Se creó una nueva historia clínica${!state.formData.date ? ' con la fecha de hoy' : ''}`,
        true
      )
      await getMedicalRecords()
    }
  }

  const handleUpdateMedicalRecord = async () => {
    if (!activeMedicalRecord) {
      showSnackbar('Primero seleccione una historia clínica')
      return
    }
    if (!hasChanged) {
      showSnackbar('No hay cambios que guardar')
      return
    }

    const newFormData = getCleanForm()
    const { outcome, payload } = await window.medicalRecord.updateMedicalRecord(
      activeMedicalRecord._id,
      newFormData
    )
    if (outcome === 'success') {
      setActiveMedicalRecord(payload)
      showSnackbar('Se actualizó la historia clínica', true)
      await getMedicalRecords()
    }
  }

  const handleDeleteMedicalRecord = async () => {
    if (!activeMedicalRecord) {
      showSnackbar('Primero seleccione una historia clínica')
      return
    }

    const option = await window.dialog.showConfirmDialog(
      'Eliminar historia clínica',
      '¿Está seguro de eliminar esta historia clínica?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActiveMedicalRecord(null)
      await window.medicalRecord.deleteMedicalRecord(activeMedicalRecord._id, currentUser.name)
      showSnackbar('Se eliminó la historia clínica')
      getMedicalRecords()
    }
  }

  const handleMedicalRecordSelection = async (id) => {
    const medicalRecord = await window.medicalRecord.getMedicalRecordById(id)
    setOriginalData(medicalRecord)
    setActiveMedicalRecord(medicalRecord)
    clearPersistentSnackbar()
    messageSent.current = false
  }

  const handlePhotoSection = () => {
    setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS_PHOTOS)
  }

  const handlePrescriptionSection = () => {
    setActiveSection(PATIENT_SECTIONS.PRESCRIPTION)
  }

  const getDisabledButtons = () => {
    if (!activeMedicalRecord) return ['update', 'delete', 'photos', 'prescription']
    else return
  }

  return {
    formData: state.formData,
    activePatient,
    activeMedicalRecord,
    nextAppointment,
    medicalRecords,
    disabledButtons: getDisabledButtons(),
    calculateAge,
    handleField,
    handleDate,
    handleCheckbox,
    handleNewMedicalRecord,
    handleUpdateMedicalRecord,
    handleDeleteMedicalRecord,
    handleMedicalRecordSelection,
    handlePhotoSection,
    handlePrescriptionSection
  }
}
