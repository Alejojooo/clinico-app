import NavigationButton from './NavigationButton'
import {
  UserGroupIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function NavigationSection() {
  return (
    <nav className="flex h-fit w-full flex-col">
      <NavigationButton
        name="Pacientes"
        icon={<UserGroupIcon className="size-6" />}
      ></NavigationButton>
      <NavigationButton
        name="Fármacos"
        icon={<ArchiveBoxIcon className="size-6" />}
      ></NavigationButton>
      <NavigationButton name="Agenda" icon={<BookOpenIcon className="size-6" />}></NavigationButton>
      <NavigationButton
        name="Herramientas"
        icon={<Cog6ToothIcon className="size-6" />}
      ></NavigationButton>
    </nav>
  )
}
