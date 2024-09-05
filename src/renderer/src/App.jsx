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
import { useState, useEffect } from 'react'

function App() {
  const [patients, setPatients] = useState([])
  const [activeId, setActiveId] = useState('')
  const [activePatient, setActivePatient] = useState(null)

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
    setActiveId(id)
    getPatientById(id)
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-primary text-accent">
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
                  isActive={activeId === patient._id}
                  onClick={() => handlePatientSelection(patient._id)}
                ></Record>
              ))}
          </RecordList>
        </SideView>
        <MainView>
          <PatientForm
            patient={activePatient}
            onDatabaseChange={() => {
              getPatients()
            }}
          ></PatientForm>
        </MainView>
      </Content>
    </div>
  )
}

export default App
