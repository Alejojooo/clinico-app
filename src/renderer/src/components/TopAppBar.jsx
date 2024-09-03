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
    <header className="flex h-16 w-screen flex-row items-center justify-start gap-5 px-5">
      <div className="flex w-[30%] flex-row items-center justify-start gap-2.5">
        <IconButton icon={<Bars3Icon className="size-6" />}></IconButton>
        <h1 className="text-lg font-semibold">Clinico</h1>
      </div>
      <div className="flex flex-grow flex-row items-center justify-between">
        <div className="flex flex-row divide-x py-1">
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
