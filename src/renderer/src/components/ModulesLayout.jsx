import ModuleButton from './ModuleButton'
import {
  UserGroupIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ModulesLayout() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <nav className="flex h-fit w-full flex-col">
      <ModuleButton
        name="Pacientes"
        icon={<UserGroupIcon className="size-6" />}
        isActive={activeIndex === 0}
        onClick={() => setActiveIndex(0)}
      ></ModuleButton>
      <ModuleButton
        name="Fármacos"
        icon={<ArchiveBoxIcon className="size-6" />}
        isActive={activeIndex === 1}
        onClick={() => setActiveIndex(1)}
      ></ModuleButton>
      <ModuleButton
        name="Agenda"
        icon={<BookOpenIcon className="size-6" />}
        isActive={activeIndex === 2}
        onClick={() => setActiveIndex(2)}
      ></ModuleButton>
      <ModuleButton
        name="Herramientas"
        icon={<Cog6ToothIcon className="size-6" />}
        isActive={activeIndex === 3}
        onClick={() => setActiveIndex(3)}
      ></ModuleButton>
    </nav>
  )
}
