import { CameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import ActionButton from '../ActionButton'
import CrudButtons from '../CrudButtons'
import FilterableDocumentList from '../FilterableRecordList'
import { CheckboxField, SimpleTextField, TextField } from '../FormField'
import useMedicalRecord from '../../hooks/useMedicalRecord'

export default function PatientMedicalRecordSection() {
  const {
    formData,
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
  } = useMedicalRecord()

  return (
    <main className="size-full">
      <form className="flex size-full flex-col items-start justify-start gap-5 rounded-2xl bg-white px-5 py-5">
        <div className="flex w-full flex-row items-end justify-between">
          <h2 className="text-xl">Historia clínica</h2>
          <CrudButtons
            onNew={handleNewMedicalRecord}
            onUpdate={handleUpdateMedicalRecord}
            onDelete={handleDeleteMedicalRecord}
          ></CrudButtons>
        </div>
        <div className="flex size-full flex-col items-start justify-start gap-2.5">
          <div className="flex w-full flex-row items-center gap-6">
            <div className="flex grow flex-col items-start justify-start gap-2.5">
              <span className="w-full border-t border-secondary text-sm">Identificación</span>
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="size-full">
                  <SimpleTextField
                    label="Nombre:"
                    labelWidth="w-14"
                    value={activePatient.name}
                    readOnly
                  ></SimpleTextField>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <SimpleTextField
                    label="Sexo:"
                    labelWidth="w-14"
                    value={activePatient.gender}
                    width="w-10"
                    readOnly
                  ></SimpleTextField>
                  <SimpleTextField
                    label="Edad:"
                    value={calculateAge(activePatient.birthdate)}
                    width="w-20"
                    readOnly
                  ></SimpleTextField>
                  <SimpleTextField label="ID:" value={activePatient.id} readOnly></SimpleTextField>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2.5">
              <span className="w-full border-t border-secondary text-sm">Historia Clínica</span>
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="size-full">
                  <SimpleTextField
                    type="datetime-local"
                    label="Fecha y hora de elaboración:"
                    fieldId="date"
                    value={formData.date}
                    onChange={handleField}
                    width="w-44"
                    gap="justify-between"
                  ></SimpleTextField>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <CheckboxField
                    label="Primera vez:"
                    fieldId="firstTime"
                    isChecked={formData.firstTime}
                    onChange={handleCheckbox}
                  ></CheckboxField>
                  <SimpleTextField
                    type="datetime-local"
                    label="Próxima cita:"
                    value="2024-10-10T13:33"
                    width="w-44"
                    readOnly
                  ></SimpleTextField>
                </div>
              </div>
            </div>
            <ActionButton
              icon={<CameraIcon className="size-6" />}
              label="Fotos"
              verticalLayout
            ></ActionButton>
          </div>
          <div className="flex size-full flex-row gap-6">
            <aside className="flex w-56 flex-col">
              <FilterableDocumentList
                title="Historial"
                documents={medicalRecords}
                activeDocument={activeMedicalRecord}
                handleDocSelection={handleMedicalRecordSelection}
              ></FilterableDocumentList>
            </aside>
            <div className="flex h-full grow flex-col gap-5">
              <TextField
                label="Historia clínica"
                fieldId="record"
                width="w-full"
                height="grow"
                value={formData.record}
                onChange={handleField}
                multiline
              ></TextField>
              <TextField
                label="Diagnóstico"
                fieldId="diagnosis"
                width="w-full"
                height="h-28"
                value={formData.diagnosis}
                onChange={handleField}
                multiline
              ></TextField>
              <TextField
                label="Tratamiento"
                fieldId="treatment"
                width="w-full"
                height="h-28"
                value={formData.treatment}
                onChange={handleField}
                multiline
              ></TextField>
              <div className="flex flex-row items-center justify-between">
                <ActionButton
                  label="Receta"
                  icon={<DocumentTextIcon className="size-5" />}
                ></ActionButton>
                <SimpleTextField
                  label="Personal médico responsable"
                  labelWidth="w-64"
                  value="Alejo"
                  width="w-96"
                  readOnly
                ></SimpleTextField>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
