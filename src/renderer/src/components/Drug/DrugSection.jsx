import PropTypes from 'prop-types'
import useDrug from '../../hooks/useDrug'
import Header from '../Header'
import SideView from '../SideView'
import TextField from '@mui/material/TextField'

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
          <div className="flex h-full grow flex-col gap-3">
            <TextField
              id="tradeName"
              name="tradeName"
              label="Nombre comercial"
              variant="outlined"
              value={formData.tradeName}
              onChange={onField}
              error={errors.tradeName}
              helperText={errors.tradeName}
              fullWidth
            />
            <TextField
              id="genericName"
              name="genericName"
              label="Nombre genérico"
              variant="outlined"
              value={formData.genericName}
              onChange={onField}
              error={errors.genericName}
              helperText={errors.genericName}
              fullWidth
            />
          </div>
          <div>Código QR</div>
        </div>
        <div className="flex w-full flex-row gap-5">
          <div className="flex size-full flex-col gap-3">
            <TextField
              id="description"
              name="description"
              label="Descripcion e indicaciones"
              variant="outlined"
              value={formData.description}
              onChange={onField}
              error={errors.description}
              helperText={errors.description}
              multiline
              rows={5}
              fullWidth
            />
            <TextField
              id="contraindications"
              name="contraindications"
              label="Contraindicaciones y efectos secundarios"
              variant="outlined"
              value={formData.contraindications}
              onChange={onField}
              error={errors.contraindications}
              helperText={errors.contraindications}
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <TextField
            id="presentations"
            name="presentations"
            label="Presentaciones y dosis"
            variant="outlined"
            value={formData.presentations}
            onChange={onField}
            error={errors.presentations}
            helperText={errors.presentations}
            multiline
            rows={12}
            fullWidth
          />
        </div>
        <TextField
          id="laboratory"
          name="laboratory"
          label="Laboratorio"
          variant="outlined"
          value={formData.laboratory}
          onChange={onField}
          error={errors.laboratory}
          helperText={errors.laboratory}
          fullWidth
        />
      </form>
    </main>
  )
}
