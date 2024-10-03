import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import IconButton from './Buttons/IconButton'

DocumentListTitle.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
}

function DocumentListTitle({ title, length }) {
  return (
    <div className="flex h-8 w-full flex-row items-end justify-between px-4">
      <h3 className="h-fit text-base font-semibold">{title}</h3>
      <span className="h-fit text-base font-semibold">{length}</span>
    </div>
  )
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
}

export default function SearchBar({ title, length }) {
  return (
    <>
      <DocumentListTitle title={title} length={length}></DocumentListTitle>
      <div className="flex h-10 w-full flex-row items-center justify-start gap-1 rounded-full bg-secondary-light py-1 pl-4 pr-1">
        <input className="grow bg-transparent outline-none" placeholder="Buscar" size="1"></input>
        <IconButton icon={<AdjustmentsHorizontalIcon />} />
      </div>
    </>
  )
}
