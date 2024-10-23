import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import AgendaModule from './components/Agenda/AgendaModule'
import DrugModule from './components/Drug/DrugModule'
import PatientModule from './components/Patient/PatientModule'
import TopAppBar from './components/TopAppBar'
import { PatientProvider } from './context/patient'
import { ViewProvider } from './context/view'
import { useView } from './hooks/useView'
import { MODULES } from './utils/view'

export default function App() {
  return (
    <Box direction="column" sx={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <ViewProvider>
        <EntityProvider>
          <Stack
            direction="column"
            sx={{ height: 1, width: 1, backgroundColor: 'light.main', color: 'accent.main' }}
          >
            <TopAppBar></TopAppBar>
            <Content></Content>
          </Stack>
        </EntityProvider>
      </ViewProvider>
    </Box>
  )
}

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

function Content() {
  const { activeModule } = useView()
  let module
  switch (activeModule) {
    case MODULES.PATIENT: {
      module = <PatientModule></PatientModule>
      break
    }
    case MODULES.DRUG: {
      module = <DrugModule></DrugModule>
      break
    }
    case MODULES.AGENDA: {
      module = <AgendaModule></AgendaModule>
      break
    }
  }
  return <Box sx={{ width: 1, flexGrow: 1, padding: '0 1.25rem 1.25rem' }}>{module}</Box>
}
