import PropTypes from 'prop-types'
import { TextField } from './FormField'
import FormImageField from './FormImageField'
import CrudButtons from './CrudButtons'

PatientForm.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
  onField: PropTypes.func,
  onImage: PropTypes.func,
  onNewPatient: PropTypes.func,
  onUpdatePatient: PropTypes.func,
  onDeletePatient: PropTypes.func
}

export default function PatientForm({
  formData,
  errors,
  onField,
  onImage,
  onNewPatient,
  onUpdatePatient,
  onDeletePatient
}) {
  return (
    <main>
      <form className="flex size-full flex-col gap-3 rounded-2xl bg-white p-5">
        <div className="flex w-full flex-col items-center justify-start gap-3.5">
          <div className="flex w-full flex-row items-end justify-between">
            <h2 className="text-xl">Identificación del paciente</h2>
            <CrudButtons
              onNewPatient={onNewPatient}
              onUpdatePatient={onUpdatePatient}
              onDeletePatient={onDeletePatient}
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
            label="Fecha de nacimiento"
            fieldId="birthdate"
            width="w-80"
            value={formData.birthdate}
            error={errors.birthdate}
            onChange={onField}
          ></TextField>
          <TextField
            label="Edad"
            fieldId="age"
            width="w-40"
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
          <FormImageField imageData={formData.image} onImageChange={onImage}></FormImageField>
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
