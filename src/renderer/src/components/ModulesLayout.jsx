import ModuleButton from './ModuleButton'

import {
  UserGroupIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function ModulesLayout() {
  return (
    <nav className="flex h-fit w-full flex-col">
      <ModuleButton name="Pacientes" icon={<UserGroupIcon className="size-6" />}></ModuleButton>
      <ModuleButton name="Fármacos" icon={<ArchiveBoxIcon className="size-6" />}></ModuleButton>
      <ModuleButton name="Agenda" icon={<BookOpenIcon className="size-6" />}></ModuleButton>
      <ModuleButton name="Herramientas" icon={<Cog6ToothIcon className="size-6" />}></ModuleButton>
    </nav>
  )
}
