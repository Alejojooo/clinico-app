import { BookOpenIcon } from '@heroicons/react/24/outline'
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PropTypes from 'prop-types'
import { useView } from '../hooks/useView'
import { MODULES } from '../utils/view'
import ModuleButton from './Buttons/ModuleButton'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'

SideView.propTypes = {
  children: PropTypes.node,
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func
}

export default function SideView({ children }) {
  return (
    <aside className="mt-2.5 flex h-full w-[30%] max-w-[400px] flex-col items-center justify-start gap-3.5">
      <ModulesLayout></ModulesLayout>
      {children}
    </aside>
  )
}

function ModulesLayout() {
  const { activeModule, changeModule } = useView()

  return (
    <nav className="flex h-fit w-full flex-col text-accent">
      <ModuleButton
        name="Pacientes"
        icon={<PeopleAltOutlinedIcon />}
        isActive={activeModule === MODULES.PATIENT}
        onClick={() => changeModule(MODULES.PATIENT)}
      ></ModuleButton>
      <ModuleButton
        name="Fármacos"
        icon={<MedicationOutlinedIcon />}
        isActive={activeModule === MODULES.DRUG}
        onClick={() => changeModule(MODULES.DRUG)}
      ></ModuleButton>
      <ModuleButton
        name="Agenda"
        icon={<ClassOutlinedIcon />}
        isActive={activeModule === MODULES.AGENDA}
        onClick={() => changeModule(MODULES.AGENDA)}
      ></ModuleButton>
      {/* <ModuleButton
        name="Herramientas"
        icon={<Cog6ToothIcon className="size-6" />}
        isActive={activeModule === MODULES.TOOLS}
        onClick={() => changeModule(MODULES.TOOLS)}
      ></ModuleButton> */}
    </nav>
  )
}
