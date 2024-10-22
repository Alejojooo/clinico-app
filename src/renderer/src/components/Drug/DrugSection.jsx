import TextField from '@mui/material/TextField'
import { Box, Stack } from '@mui/system'
import PropTypes from 'prop-types'
import useDrug from '../../hooks/useDrug'
import CrudButtons from '../Buttons/CrudButtons'
import Header from '../Header'
import FilterableDocumentList from '../SearchableDocumentList'
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
    <Stack direction="row" spacing="1.25rem" sx={{ width: 1, height: 1 }}>
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
    </Stack>
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
    <Box component="main" sx={{ flexGrow: 1, height: 1 }}>
      <Stack
        component="form"
        direction="column"
        spacing="0.75rem"
        sx={{
          width: 1,
          height: 1,
          padding: '1.25rem',
          backgroundColor: 'white',
          borderRadius: '1rem'
        }}
      >
        <Header title="Fármacos">
          <CrudButtons
            onNew={onNew}
            onUpdate={onUpdate}
            onDelete={onDelete}
            disabledButtons={disabledButtons}
          />
        </Header>
        <Stack direction="row" spacing="1.25rem" sx={{ width: 1 }}>
          <Stack direction="column" spacing="0.75rem" sx={{ flexGrow: 1, height: 1 }}>
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
          </Stack>
        </Stack>
        <Stack direction="row" spacing="1.25rem" sx={{ width: 1 }}>
          <Stack direction="column" spacing="0.75rem" sx={{ width: 1, height: 1 }}>
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
          </Stack>
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
        </Stack>
        <TextField
          id="laboratory"
          name="laboratory"
          label="Laboratorio"
          variant="outlined"
          value={formData.laboratory}
          onChange={onField}
          fullWidth
        />
      </Stack>
    </Box>
  )
}
