import PropTypes from 'prop-types'
import useDrug from '../../hooks/useDrug'
import Header from '../Header'
import SideView from '../SideView'
import TextField from '@mui/material/TextField'
import FilterableDocumentList from '../FilterableDocumentList'

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
      <SideView>
        <FilterableDocumentList
          title="Listado de pacientes"
          documents={drugs}
          activeDocument={activeDrug}
          handleDocSelection={handleDrugSelection}
        ></FilterableDocumentList>
      </SideView>
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
              error={errors.tradeName ? true : false}
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
          fullWidth
        />
      </form>
    </main>
  )
}
