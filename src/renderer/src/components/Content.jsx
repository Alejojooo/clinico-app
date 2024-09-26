import { MODULES, PATIENT_SECTIONS } from '../constants'
import usePatient from '../hooks/usePatient'
import { useView } from '../hooks/useView'
import ConfirmationDialog from './ConfirmationDialog'
import CrudButtons from './CrudButtons'
import { SimpleTextField, CheckboxField, TextField } from './FormField'
import PatientForm from './PatientForm'
import SideView from './SideView'
import { CameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import ActionButton from './ActionButton'
import FilterableDocumentList from './FilterableRecordList'

function PatientIdentificationSection() {
  const {
    formData,
    errors,
    activePatient,
    patients,
    renderConfirmationScreen,
    handleField,
    handleImage,
    handleNewPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handlePatientSelection
  } = usePatient()

  return (
    <>
      {renderConfirmationScreen && (
        <ConfirmationDialog
          title="Eliminar paciente"
          message="¿Está seguro de eliminar este paciente?"
          onSelection={(selection) => {
            handleDeletePatient(selection)
          }}
        ></ConfirmationDialog>
      )}
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

function PatientMedicalRecordSection() {
  return (
    <main className="size-full">
      <form className="flex size-full flex-col items-start justify-start gap-5 rounded-2xl bg-white px-5 py-5">
        <div className="flex w-full flex-row items-end justify-between">
          <h2 className="text-xl">Historia clínica</h2>
          <CrudButtons></CrudButtons>
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
                    value="Jorge Alejandro Fernández de la Cruz"
                    readOnly
                  ></SimpleTextField>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <SimpleTextField
                    label="Sexo:"
                    labelWidth="w-14"
                    value="M"
                    width="w-10"
                    readOnly
                  ></SimpleTextField>
                  <SimpleTextField
                    label="Edad:"
                    value="22a10m"
                    width="w-20"
                    readOnly
                  ></SimpleTextField>
                  <SimpleTextField label="ID:" value="3243323001601" readOnly></SimpleTextField>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2.5">
              <span className="w-full border-t border-secondary text-sm">Historia Clínica</span>
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="size-full">
                  <SimpleTextField
                    label="Fecha y hora de elaboración:"
                    fieldId="date"
                    value="22/04/2022 10:00"
                    width="w-40"
                    gap="justify-between"
                    readOnly
                  ></SimpleTextField>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <CheckboxField label="Primera vez:" fieldId="firsTime"></CheckboxField>
                  <SimpleTextField
                    label="Próxima cita:"
                    value="10/08/2024 13:33"
                    width="w-40"
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
                activeDocument={null}
                documents={[]}
                handleDocSelection={null}
              ></FilterableDocumentList>
            </aside>
            <div className="flex h-full grow flex-col gap-5">
              <TextField
                label="Historia clínica"
                fieldId="medicalRecord"
                width="w-full"
                height="grow"
                multiline
              ></TextField>
              <TextField
                label="Diagnóstico"
                fieldId="diagnose"
                width="w-full"
                height="h-28"
                multiline
              ></TextField>
              <TextField
                label="Tratamiento"
                fieldId="treatment"
                width="w-full"
                height="h-28"
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

function PatientModule() {
  const { activeSection } = useView()

  switch (activeSection) {
    case PATIENT_SECTIONS.IDENTIFICATION: {
      return <PatientIdentificationSection></PatientIdentificationSection>
    }
    case PATIENT_SECTIONS.MEDICAL_RECORDS: {
      return <PatientMedicalRecordSection></PatientMedicalRecordSection>
    }
  }
}

export default function Content() {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientModule></PatientModule>
    }
  }
}
