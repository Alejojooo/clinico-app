import {
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { useView } from '../hooks/useView.js'
import { MODULES } from '../utils/view.js'
import IconButton from './Buttons/IconButton.jsx'
import SectionsLayout from './SectionsLayout.jsx'

export default function TopAppBar() {
  const { activeModule } = useView()

  return (
    <header className="flex h-16 w-screen flex-none flex-row items-center justify-start gap-5 px-5">
      <div className="flex w-[30%] flex-row items-center justify-start gap-2.5">
        <IconButton icon={<Bars3Icon className="size-6" />}></IconButton>
        <h1 className="text-lg font-semibold">Clinico</h1>
      </div>
      <div className="flex flex-grow flex-row items-center justify-between">
        {(activeModule === MODULES.PATIENT || activeModule === MODULES.DRUG) && (
          <SectionsLayout></SectionsLayout>
        )}
        <div className="flex flex-row gap-2.5">
          <IconButton icon={<ArrowPathIcon className="size-6" />}></IconButton>
          <IconButton icon={<ArrowRightStartOnRectangleIcon className="size-6" />}></IconButton>
        </div>
      </div>
    </header>
  )
}
