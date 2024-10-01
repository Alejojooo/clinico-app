import { DocumentTextIcon, Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import usePatient from '../hooks/usePatient'
import { useView } from '../hooks/useView'
import { MODULES, PATIENT_SECTIONS } from '../utils/view'
import SectionButton from './SectionButton'

function PatientSectionsLayout() {
  const { activePatient } = usePatient()
  const { activeSection, setActiveSection } = useView()

  return (
    <div className="flex flex-row divide-x">
      <SectionButton
        label="Identificación"
        icon={<UserCircleIcon className="size-4" />}
        rounded="left"
        isActive={activeSection === PATIENT_SECTIONS.IDENTIFICATION}
        onClick={() => setActiveSection(PATIENT_SECTIONS.IDENTIFICATION)}
      ></SectionButton>
      <SectionButton
        label="Historias"
        icon={<Square3Stack3DIcon className="size-4" />}
        isActive={activeSection === PATIENT_SECTIONS.MEDICAL_RECORDS}
        onClick={() => {
          if (activePatient) setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS)
        }}
      ></SectionButton>
      <SectionButton
        label="Reporte"
        icon={<DocumentTextIcon className="size-4" />}
        rounded="right"
        isActive={activeSection === PATIENT_SECTIONS.REPORT}
        onClick={() => setActiveSection(PATIENT_SECTIONS.REPORT)}
      ></SectionButton>
    </div>
  )
}

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
