import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { Button, ButtonGroup, Stack } from '@mui/material'
import usePatient from '../hooks/usePatient'
import useSnackbar from '../hooks/useSnackbar'
import useUser from '../hooks/useUser'
import useView from '../hooks/useView'
import { ROLES } from '../utils/admin'
import { MODULES, PATIENT_SECTIONS } from '../utils/view'

export default function SectionsLayout() {
  const { activeModule } = useView()
  const { currentUser } = useUser()

  if (currentUser.role !== ROLES.C) return <div></div>

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientSectionsLayout />
    }
    default: {
      return <div></div>
    }
  }
}

function PatientSectionsLayout() {
  const { activePatient } = usePatient()
  const { setActiveSection } = useView()
  const { showSnackbar } = useSnackbar()

  return (
    <Stack direction="row">
      <ButtonGroup variant="contained">
        <Button
          startIcon={<AccountCircleOutlinedIcon />}
          onClick={() => setActiveSection(PATIENT_SECTIONS.IDENTIFICATION)}
        >
          Identificación
        </Button>
        <Button
          startIcon={<LibraryBooksOutlinedIcon />}
          onClick={() => {
            if (activePatient) setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS)
            else showSnackbar('Primero seleccione un paciente')
          }}
          disabled={!activePatient}
        >
          Historias
        </Button>
        {/* <Button startIcon={<AssessmentOutlinedIcon />} disabled>
          Reporte
        </Button> */}
      </ButtonGroup>
    </Stack>
  )
}
