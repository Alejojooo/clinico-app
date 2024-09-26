import {
  ArchiveBoxIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { MODULES } from '../constants'
import { useView } from '../hooks/useView'
import ModuleButton from './ModuleButton'

export default function ModulesLayout() {
  const { activeModule, changeModule } = useView()

  return (
    <nav className="flex h-fit w-full flex-col">
      <ModuleButton
        name="Pacientes"
        icon={<UserGroupIcon className="size-6" />}
        isActive={activeModule === MODULES.PATIENT}
        onClick={() => changeModule(MODULES.PATIENT)}
      ></ModuleButton>
      <ModuleButton
        name="Fármacos"
        icon={<ArchiveBoxIcon className="size-6" />}
        isActive={activeModule === MODULES.DRUG}
        onClick={() => changeModule(MODULES.DRUG)}
      ></ModuleButton>
      <ModuleButton
        name="Agenda"
        icon={<BookOpenIcon className="size-6" />}
        isActive={activeModule === MODULES.AGENDA}
        onClick={() => changeModule(MODULES.AGENDA)}
      ></ModuleButton>
      <ModuleButton
        name="Herramientas"
        icon={<Cog6ToothIcon className="size-6" />}
        isActive={activeModule === MODULES.TOOLS}
        onClick={() => changeModule(MODULES.TOOLS)}
      ></ModuleButton>
    </nav>
  )
}
