import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import AdminModule from './components/Admin/AdminModule'
import AgendaModule from './components/Agenda/AgendaModule'
import DrugModule from './components/Drug/DrugModule'
import PatientModule from './components/Patient/PatientModule'
import SessionModule from './components/Session/SessionModule'
import TopAppBar from './components/TopAppBar'
import { PatientProvider } from './context/patient'
import useView from './hooks/useView'
import { MODULES } from './utils/view'

export default function App() {
  const { activeModule } = useView()

  if (activeModule === MODULES.ADMIN) {
    return <AdminModule />
  } else if (activeModule === MODULES.SESSION) {
    return <SessionModule />
  } else {
    return (
      <EntityProvider>
        <Stack
          direction="column"
          sx={{ height: 1, width: 1, backgroundColor: 'light.main', color: 'accent.main' }}
        >
          <TopAppBar />
          <Content />
        </Stack>
      </EntityProvider>
    )
  }
}

EntityProvider.propTypes = {
  children: PropTypes.node
}

function EntityProvider({ children }) {
  const { activeModule } = useView()

  if (activeModule === MODULES.PATIENT) {
    return <PatientProvider>{children}</PatientProvider>
  } else {
    return <Fragment>{children}</Fragment>
  }
}

function Content() {
  const { activeModule } = useView()
  let module
  switch (activeModule) {
    case MODULES.PATIENT: {
      module = <PatientModule />
      break
    }
    case MODULES.DRUG: {
      module = <DrugModule />
      break
    }
    case MODULES.AGENDA: {
      module = <AgendaModule />
      break
    }
  }
  return <Box sx={{ width: 1, flexGrow: 1, padding: '0 1.25rem 1.25rem' }}>{module}</Box>
}
