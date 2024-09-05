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
  const [patients, setPatients] = useState([{}])

  const getPatients = async () => {
    const newPatients = await window.database.getPatients()
    setPatients(newPatients)
    console.log(newPatients)
  }

  useEffect(() => {
    getPatients()
  }, [])

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
            {patients.map((patient) => (
              <Record key={patient._id} name={patient.name}></Record>
            ))}
          </RecordList>
        </SideView>
        <MainView>
          <PatientForm></PatientForm>
        </MainView>
      </Content>
    </div>
  )
}

export default App
