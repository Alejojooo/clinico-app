import IconButton from './IconButton.jsx'
import SegmentedButton from './SegmentedButton.jsx'

import {
  Bars3Icon,
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
  Square3Stack3DIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export default function TopAppBar() {
  return (
    <header className="h-16 w-screen px-5 flex flex-row justify-start items-center gap-5">
      <div className="w-[30%] flex flex-row justify-start items-center gap-2.5">
        <IconButton icon={<Bars3Icon className="size-6" />}></IconButton>
        <h1 className="text-lg font-semibold">Clinico</h1>
      </div>
      <div className="flex flex-row flex-grow justify-between items-center">
        <div className="flex flex-row py-1 divide-x">
          <SegmentedButton
            label="Identificación"
            icon={<UserCircleIcon className="size-4" />}
            rounded="left"
          ></SegmentedButton>
          <SegmentedButton
            label="Historias"
            icon={<Square3Stack3DIcon className="size-4" />}
          ></SegmentedButton>
          <SegmentedButton
            label="Reporte"
            icon={<DocumentTextIcon className="size-4" />}
            rounded="right"
          ></SegmentedButton>
        </div>
        <div className="flex flex-row gap-2.5">
          <IconButton icon={<ArrowPathIcon className="size-6" />}></IconButton>
          <IconButton icon={<ArrowRightStartOnRectangleIcon className="size-6" />}></IconButton>
        </div>
      </div>
    </header>
  )
}
