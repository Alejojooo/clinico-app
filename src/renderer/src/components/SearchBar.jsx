import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import IconButton from './IconButton'

export default function SearchBar() {
  return (
    <div className="flex h-10 w-full flex-row items-center justify-start gap-1 rounded-full bg-secondary-light px-1 py-1">
      <IconButton icon={<MagnifyingGlassIcon className="size-6" />}></IconButton>
      <input
        className="flex-grow bg-transparent outline-none"
        placeholder="Nombre a buscar..."
      ></input>
      <IconButton icon={<AdjustmentsHorizontalIcon className="size-6" />} />
    </div>
  )
}
