import PropTypes from 'prop-types'
import Content from './components/Content'
import TopAppBar from './components/TopAppBar'
import { PatientProvider } from './context/patient'
import { ViewProvider } from './context/view'
import { useView } from './hooks/useView'
import { MODULES } from './utils/view'

EntityProvider.propTypes = {
  children: PropTypes.node
}

function EntityProvider({ children }) {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientProvider>{children}</PatientProvider>
    }
    default: {
      return <>{children}</>
    }
  }
}

function App() {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-primary text-accent">
      <ViewProvider>
        <EntityProvider>
          <TopAppBar></TopAppBar>
          <div className="flex w-full flex-grow flex-row gap-5 px-5 pb-5">
            <Content></Content>
          </div>
        </EntityProvider>
      </ViewProvider>
    </div>
  )
}

export default App
