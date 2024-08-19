import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import IconButton from './IconButton'

export default function SearchBar() {
  return (
    <div className="bg-teal-100 w-full h-10 rounded-full px-1 py-1 flex flex-row justify-start items-center gap-1">
      <IconButton icon={<MagnifyingGlassIcon className="size-6" />}></IconButton>
      <input className="bg-transparent flex-grow" placeholder="Nombre a buscar..."></input>
      <IconButton icon={<AdjustmentsHorizontalIcon className="size-6" />} />
    </div>
  )
}
