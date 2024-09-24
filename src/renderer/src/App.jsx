import Content from './components/Content'
import TopAppBar from './components/TopAppBar'
import { MODULES } from './constants'
import { PatientProvider } from './context/patient'
import { ViewProvider } from './context/view'
import { useView } from './hooks/useView'
import PropTypes from 'prop-types'

Provider.propTypes = {
  children: PropTypes.node
}

function Provider({ children }) {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientProvider>{children}</PatientProvider>
    }
  }
}

function App() {
  return (
    <ViewProvider>
      <div className="relative flex h-screen w-screen flex-col bg-primary text-accent">
        <Provider>
          <TopAppBar></TopAppBar>
          <div className="flex w-full flex-grow flex-row gap-5 px-5 pb-5">
            <Content></Content>
          </div>
        </Provider>
      </div>
    </ViewProvider>
  )
}

export default App
