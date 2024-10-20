import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { Button, ButtonGroup, Stack } from '@mui/material'
import usePatient from '../hooks/usePatient'
import { useView } from '../hooks/useView'
import { MODULES, PATIENT_SECTIONS } from '../utils/view'

export default function SectionsLayout() {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientSectionsLayout></PatientSectionsLayout>
    }
    case MODULES.DRUG:
    case MODULES.AGENDA: {
      return <div></div>
    }
    default: {
      throw new Error('There is no section layout for ' + activeModule)
    }
  }
}

function PatientSectionsLayout() {
  const { activePatient } = usePatient()
  const { setActiveSection, addSnackbar } = useView()

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
            else addSnackbar('Primero seleccione un paciente')
          }}
          disabled={!activePatient}
        >
          Historias
        </Button>
        <Button startIcon={<AssessmentOutlinedIcon />} disabled>
          Reporte
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
