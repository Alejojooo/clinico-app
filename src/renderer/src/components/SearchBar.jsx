import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import IconButton from './IconButton'

export default function SearchBar() {
  return (
    <div className="flex flex-row justify-start items-center gap-1 px-1 py-1 w-full h-10 bg-secondary-light rounded-full">
      <IconButton icon={<MagnifyingGlassIcon className="size-6" />}></IconButton>
      <input
        className="flex-grow outline-none bg-transparent"
        placeholder="Nombre a buscar..."
      ></input>
      <IconButton icon={<AdjustmentsHorizontalIcon className="size-6" />} />
    </div>
  )
}
