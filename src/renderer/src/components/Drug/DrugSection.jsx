import PropTypes from 'prop-types'
import useDrug from '../../hooks/useDrug'
import { TextField } from '../FormFields/TextField'
import Header from '../Header'
import SideView from '../SideView'

export default function DrugSection() {
  const {
    formData,
    errors,
    activeDrug,
    drugs,
    disabledButtons,
    handleField,
    handleNewDrug,
    handleUpdateDrug,
    handleDeleteDrug,
    handleDrugSelection
  } = useDrug()

  return (
    <>
      <SideView
        activeDocument={activeDrug}
        documents={drugs}
        handleDocSelection={handleDrugSelection}
      ></SideView>
      <DrugForm
        formData={formData}
        errors={errors}
        disabledButtons={disabledButtons}
        onField={handleField}
        onNew={handleNewDrug}
        onUpdate={handleUpdateDrug}
        onDelete={handleDeleteDrug}
      ></DrugForm>
    </>
  )
}

DrugForm.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
  disabledButtons: PropTypes.array,
  onField: PropTypes.func,
  onNew: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

function DrugForm({ formData, errors, disabledButtons, onField, onNew, onUpdate, onDelete }) {
  return (
    <main className="h-full grow">
      <form className="flex size-full flex-col gap-3 rounded-2xl bg-white p-5">
        <Header
          title="Fármacos"
          handlers={{ onNew, onUpdate, onDelete }}
          disabledButtons={disabledButtons}
        ></Header>
        <div className="flex w-full flex-row gap-5">
          <div className="flex h-full grow flex-col gap-5">
            <TextField
              label="Nombre comercial"
              fieldId="tradeName"
              width="w-full"
              value={formData.tradeName}
              error={errors.tradeName}
              onChange={onField}
            ></TextField>
            <TextField
              label="Nombre genérico"
              fieldId="genericName"
              width="w-full"
              value={formData.genericName}
              onChange={onField}
            ></TextField>
          </div>
          <div>Código QR</div>
        </div>
        <div className="flex w-full grow flex-row gap-5">
          <div className="flex size-full flex-col gap-3">
            <TextField
              label="Descripciones e indicaciones"
              fieldId="description"
              height="h-full"
              width="w-full"
              value={formData.description}
              onChange={onField}
              multiline
            ></TextField>
            <TextField
              label="Contraindicaciones y efectos secundarios"
              fieldId="contraindications"
              height="h-full"
              width="w-full"
              value={formData.contraindications}
              onChange={onField}
              multiline
            ></TextField>
          </div>
          <TextField
            label="Presentaciones y dosis"
            fieldId="presentations"
            height=""
            width="w-full"
            value={formData.presentations}
            onChange={onField}
            multiline
          ></TextField>
        </div>
        <TextField
          label="Laboratorio"
          fieldId="laboratory"
          width="w-full"
          value={formData.laboratory}
          onChange={onField}
        ></TextField>
      </form>
    </main>
  )
}
