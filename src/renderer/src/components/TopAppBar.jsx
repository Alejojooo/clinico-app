import IconButton from './IconButton.jsx'

import {
  Bars3Icon,
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'

export default function TopAppBar() {
  return (
    <header className="h-16 w-screen px-5 flex flex-row justify-start items-center gap-5">
      <div className="w-1/3 flex flex-row justify-start items-center gap-2.5">
        <IconButton icon={<Bars3Icon className="size-6" />}></IconButton>
        <h1 className="text-lg font-semibold">Clinico</h1>
      </div>
      <div className="flex flex-row flex-grow justify-end items-center gap-2.5">
        <IconButton icon={<ArrowPathIcon className="size-6" />}></IconButton>
        <IconButton icon={<ArrowRightStartOnRectangleIcon className="size-6" />}></IconButton>
      </div>
    </header>
  )
}
