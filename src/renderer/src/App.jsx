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
    <Stack
      direction="column"
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'light.main',
        color: 'accent.main'
      }}
    >
      <ViewProvider>
        <EntityProvider>
          <TopAppBar></TopAppBar>
          <Box sx={{ width: 1, flexGrow: 1, padding: '0 1.25rem 1.25rem' }}>
            <Content></Content>
          </Box>
        </EntityProvider>
      </ViewProvider>
    </Stack>
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

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientModule></PatientModule>
    }
    case MODULES.DRUG: {
      return <DrugModule></DrugModule>
    }
    case MODULES.AGENDA: {
      return <AgendaModule></AgendaModule>
    }
  }
}
