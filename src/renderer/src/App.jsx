import TopAppBar from './components/TopAppBar'
import Content from './components/Content'
import SideView from './components/SideView'
import MainView from './components/MainView'
import PatientForm from './components/PatientForm'
import RecordList from './components/RecordList'
import RecordListTitle from './components/RecordListTitle'
import SearchBar from './components/SearchBar'
import Record from './components/Record'
import ModulesLayout from './components/ModulesLayout'
import SectionsLayout from './components/SectionsLayout'
import ConfirmationDialog from './components/ConfirmationDialog'
import { useState, useEffect } from 'react'

function App() {
  const [patients, setPatients] = useState([])
  const [activePatient, setActivePatient] = useState(null)
  const [renderConfirmationScreen, setRenderConfirmationScreen] = useState(false)

  const getPatients = async () => {
    const newPatients = await window.database.getPatients()
    setPatients(newPatients)
  }

  const getPatientById = async (id) => {
    const patient = await window.database.getPatientById(id)
    setActivePatient(patient)
  }

  useEffect(() => {
    getPatients()
  }, [])

  const handlePatientSelection = (id) => {
    getPatientById(id)
  }

  const handleNewPatient = (patient) => {
    setActivePatient(patient)
    if (patient) getPatients()
  }

  const handleUpdatePatient = () => {
    getPatients()
  }

  const handleDeletePatient = async (option) => {
    if (!activePatient) return
    switch (option) {
      case 'ok':
        await window.database.deletePatient(activePatient._id)
        setActivePatient(null)
        setRenderConfirmationScreen(false)
        getPatients()
        break
      case 'cancel':
        setRenderConfirmationScreen(false)
        break
      default:
        setRenderConfirmationScreen(true)
        break
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-primary text-accent">
      {renderConfirmationScreen && (
        <ConfirmationDialog
          title="Eliminar paciente"
          message="¿Está seguro de eliminar este paciente?"
          onSelection={(selection) => {
            handleDeletePatient(selection)
          }}
        ></ConfirmationDialog>
      )}
      <TopAppBar>
        <SectionsLayout></SectionsLayout>
      </TopAppBar>
      <Content>
        <SideView>
          <ModulesLayout></ModulesLayout>
          <RecordListTitle title="Listado de pacientes" length={patients.length}></RecordListTitle>
          <SearchBar></SearchBar>
          <RecordList>
            {patients?.length > 0 &&
              patients.map((patient) => (
                <Record
                  key={patient._id}
                  name={patient.name}
                  isActive={activePatient?._id === patient._id}
                  onClick={() => handlePatientSelection(patient._id)}
                ></Record>
              ))}
          </RecordList>
        </SideView>
        <MainView>
          <PatientForm
            patient={activePatient}
            onNewPatient={(patient) => handleNewPatient(patient)}
            onUpdatePatient={handleUpdatePatient}
            onDeletePatient={handleDeletePatient}
          ></PatientForm>
        </MainView>
      </Content>
    </div>
  )
}

export default App
