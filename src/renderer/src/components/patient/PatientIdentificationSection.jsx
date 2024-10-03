import PropTypes from 'prop-types'
import usePatient from '../../hooks/usePatient'
import CrudButtons from '../Buttons/CrudButtons'
import { TextField } from '../FormFields/TextField'
import SideView from '../SideView'
import ImageField from '../formFields/ImageField'

PatientForm.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
  onField: PropTypes.func,
  onImage: PropTypes.func,
  onNewPatient: PropTypes.func,
  onUpdatePatient: PropTypes.func,
  onDeletePatient: PropTypes.func
}

export default function PatientIdentificationSection() {
  const {
    formData,
    errors,
    activePatient,
    patients,
    handleField,
    handleImage,
    handleNewPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handlePatientSelection
  } = usePatient()

  return (
    <>
      <SideView
        documents={patients}
        activeDocument={activePatient}
        handleDocSelection={handlePatientSelection}
      ></SideView>
      <PatientForm
        formData={formData}
        errors={errors}
        onField={handleField}
        onImage={handleImage}
        onNewPatient={handleNewPatient}
        onUpdatePatient={handleUpdatePatient}
        onDeletePatient={handleDeletePatient}
      ></PatientForm>
    </>
  )
}

function PatientForm({
  formData,
  errors,
  onField,
  onImage,
  onNewPatient,
  onUpdatePatient,
  onDeletePatient
}) {
  return (
    <main className="h-full grow">
      <form className="flex h-full grow flex-col gap-3 rounded-2xl bg-white p-5">
        <div className="flex w-full flex-col items-center justify-start gap-3.5">
          <div className="flex w-full flex-row items-end justify-between">
            <h2 className="text-xl">Identificación del paciente</h2>
            <CrudButtons
              onNew={onNewPatient}
              onUpdate={onUpdatePatient}
              onDelete={onDeletePatient}
            ></CrudButtons>
          </div>
          <div className="w-full border-t border-secondary"></div>
        </div>
        <div className="flex w-full flex-row gap-5">
          <TextField
            label="Nombre"
            fieldId="name"
            width="grow"
            value={formData.name}
            error={errors.name}
            onChange={onField}
          ></TextField>
          <TextField
            label="Sexo"
            fieldId="gender"
            value={formData.gender}
            error={errors.gender}
            onChange={onField}
          ></TextField>
          <TextField
            label="Estado civil"
            fieldId="maritalStatus"
            value={formData.maritalStatus}
            error={errors.maritalStatus}
            onChange={onField}
          ></TextField>
        </div>
        <div className="flex w-full flex-row gap-5">
          <TextField
            type="date"
            label="Fecha de nacimiento"
            fieldId="birthdate"
            width="w-60 flex-none"
            value={formData.birthdate}
            error={errors.birthdate}
            onChange={onField}
          ></TextField>
          <TextField
            label="Edad"
            fieldId="age"
            width="w-40 flex-none"
            value={formData.age}
            readOnly
          ></TextField>
          <TextField
            label="ID"
            fieldId="id"
            width="grow"
            value={formData.id}
            error={errors.id}
            onChange={onField}
          ></TextField>
        </div>
        <div className="flex w-full flex-row items-center justify-between gap-5">
          <div className="flex flex-grow flex-col gap-3">
            <TextField
              label="Aseguradora"
              fieldId="insurance"
              width="w-full"
              value={formData.insurance}
              onChange={onField}
            ></TextField>
            <TextField
              label="Email"
              fieldId="email"
              width="w-full"
              value={formData.email}
              onChange={onField}
            ></TextField>
            <TextField
              label="Domicilio"
              fieldId="home"
              width="w-full"
              height="h-28"
              value={formData.home}
              onChange={onField}
              multiline
            ></TextField>
          </div>
          <ImageField imageData={formData.image} onImageChange={onImage}></ImageField>
        </div>
        <div className="flex w-full flex-row gap-5">
          <TextField
            label="Teléfonos"
            fieldId="phone"
            width="w-60"
            height="h-28"
            value={formData.phone}
            onChange={onField}
            multiline
          ></TextField>
          <TextField
            label="Otros datos"
            fieldId="otherData"
            width="grow"
            height="h-28"
            value={formData.otherData}
            onChange={onField}
            multiline
          ></TextField>
        </div>
      </form>
    </main>
  )
}
