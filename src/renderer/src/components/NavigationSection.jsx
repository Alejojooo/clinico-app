import NavigationButton from './NavigationButton'
import {
  UserGroupIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function NavigationSection() {
  return (
    <div className="w-full h-fit flex flex-col">
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
    </div>
  )
}
