import { DocumentTextIcon, Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import usePatient from '../hooks/usePatient'
import { useView } from '../hooks/useView'
import { MODULES, PATIENT_SECTIONS } from '../utils/view'
import SegmentedButton from './Buttons/SegmentedButton'

export default function SectionsLayout() {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientSectionsLayout></PatientSectionsLayout>
    }
    case MODULES.DRUG: {
      return <div></div>
    }
    default: {
      throw new Error('There is no section layout for ' + activeModule)
    }
  }
}

function PatientSectionsLayout() {
  const { activePatient } = usePatient()
  const { activeSection, setActiveSection, addSnackbar } = useView()

  return (
    <div className="flex flex-row">
      <SegmentedButton
        className="border-r"
        label="Identificación"
        icon={<UserCircleIcon className="size-4" />}
        rounded="left"
        isActive={activeSection === PATIENT_SECTIONS.IDENTIFICATION}
        onClick={() => setActiveSection(PATIENT_SECTIONS.IDENTIFICATION)}
      ></SegmentedButton>
      <SegmentedButton
        className="border-r"
        label="Historias"
        icon={<Square3Stack3DIcon className="size-4" />}
        isActive={
          activeSection === PATIENT_SECTIONS.MEDICAL_RECORDS ||
          activeSection === PATIENT_SECTIONS.MEDICAL_RECORDS_PHOTOS
        }
        onClick={() => {
          if (activePatient) setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS)
          else addSnackbar('Primero seleccione un paciente')
        }}
        disabled={!activePatient}
      ></SegmentedButton>
      <SegmentedButton
        label="Reporte"
        icon={<DocumentTextIcon className="size-4" />}
        rounded="right"
        isActive={activeSection === PATIENT_SECTIONS.REPORT}
        onClick={() => setActiveSection(PATIENT_SECTIONS.REPORT)}
      ></SegmentedButton>
    </div>
  )
}
