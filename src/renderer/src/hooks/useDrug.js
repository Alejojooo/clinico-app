import { useEffect, useReducer, useRef, useState } from 'react'
import { ACTIONS, drugReducer, initialState } from '../reducers/drug'
import useFormChanged from './useFormChanged'
import useSnackbar from './useSnackbar'
import { clean } from '../utils/form'

export default function useDrug() {
  const [drugs, setDrugs] = useState([])
  const [state, dispatch] = useReducer(drugReducer, initialState)
  const [activeDrug, setActiveDrug] = useState(null)
  const { showSnackbar, showPersistentSnackbar, clearPersistentSnackbar } = useSnackbar()
  const { hasChanged, setOriginalData } = useFormChanged(state.formData)

  const messageSent = useRef(false)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_DRUG, drug: activeDrug })
  }, [activeDrug])

  useEffect(() => {
    getDrugs()
  }, [])

  const getDrugs = async () => {
    const newDrugs = await window.drug.getDrugs()
    setDrugs(newDrugs)
  }

  const handleField = (e) => {
    if (activeDrug && hasChanged && !messageSent.current) {
      showPersistentSnackbar('Hay cambios no guardados')
      messageSent.current = true
    }
    dispatch({ type: ACTIONS.FIELD_CHANGE, field: e.target })
    console.log(e.target.value.replace('\n', 'ENTER'))
  }

  const getCleanForm = () => {
    const newForm = clean(state.formData)
    newForm.presentations = state.formData.presentations
      .split(/\r?\n/)
      .filter((line) => line.trim() !== '')
    return newForm
  }

  const handleNewDrug = async () => {
    if (activeDrug) {
      dispatch({ type: ACTIONS.CLEAR_FORM })
      setActiveDrug(null)
      showPersistentSnackbar('Se va a crear un nuevo medicamento')
      return
    }

    const { outcome, payload } = await window.drug.newDrug(getCleanForm())
    if (outcome === 'success') {
      setActiveDrug(payload)
      showSnackbar('Se creó un nuevo medicamento', true)
      await getDrugs()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
      showSnackbar('Ocurrió un error al crear un nuevo medicamento')
    }
  }

  const handleUpdateDrug = async () => {
    if (!activeDrug) {
      showSnackbar('Primero seleccione un medicamento')
      return
    }
    if (!hasChanged) {
      showSnackbar('No hay cambios que guardar')
      return
    }

    const { outcome, payload } = await window.drug.updateDrug(activeDrug._id, getCleanForm())
    if (outcome === 'success') {
      showSnackbar('Se actualizó el medicamento', true)
      await getDrugs()
    } else {
      dispatch({ type: ACTIONS.SET_ERRORS, errors: payload })
      showSnackbar('Ocurrió un error al actualizar el medicamento')
    }
  }

  const handleDeleteDrug = async () => {
    if (!activeDrug) {
      showSnackbar('Primero seleccione un medicamento')
      return
    }
    const option = await window.dialog.showConfirmDialog(
      'Eliminar medicamento',
      '¿Está seguro de eliminar este medicamento?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActiveDrug(null)
      await window.patient.deleteDrug(activeDrug._id)
      showSnackbar('Se eliminó el medicamento')
      await getDrugs()
    }
  }

  const handleDrugSelection = async (id) => {
    const drug = await window.drug.getDrugById(id)
    setOriginalData(drug)
    setActiveDrug(drug)
    clearPersistentSnackbar()
    messageSent.current = false
  }

  const getDisabledButtons = () => {
    if (!activeDrug) return ['update', 'delete']
    else return []
  }

  return {
    formData: state.formData,
    errors: state.errors,
    activeDrug,
    drugs,
    disabledButtons: getDisabledButtons(),
    handleField,
    handleNewDrug,
    handleUpdateDrug,
    handleDeleteDrug,
    handleDrugSelection
  }
}
