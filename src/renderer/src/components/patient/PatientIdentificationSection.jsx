import usePatient from '../../hooks/usePatient'
import PatientForm from './PatientForm'
import SideView from '../SideView'

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
