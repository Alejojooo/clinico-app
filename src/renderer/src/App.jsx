import TopAppBar from './components/TopAppBar'
import Content from './components/Content'
import SideView from './components/SideView'
import MainView from './components/MainView'
import PatientForm from './components/PatientForm'

function App() {
  return (
    <div className="flex h-screen w-screen flex-col bg-primary text-accent">
      <TopAppBar></TopAppBar>
      <Content>
        <SideView></SideView>
        <MainView>
          <PatientForm></PatientForm>
        </MainView>
      </Content>
    </div>
  )
}

export default App
