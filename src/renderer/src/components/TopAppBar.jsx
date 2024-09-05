import PropTypes from 'prop-types'
import IconButton from './IconButton.jsx'
import {
  Bars3Icon,
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'

export default function TopAppBar({ children }) {
  return (
    <header className="flex h-16 w-screen flex-row items-center justify-start gap-5 px-5">
      <div className="flex w-[30%] flex-row items-center justify-start gap-2.5">
        <IconButton icon={<Bars3Icon className="size-6" />}></IconButton>
        <h1 className="text-lg font-semibold">Clinico</h1>
      </div>
      <div className="flex flex-grow flex-row items-center justify-between">
        {children}
        <div className="flex flex-row gap-2.5">
          <IconButton icon={<ArrowPathIcon className="size-6" />}></IconButton>
          <IconButton icon={<ArrowRightStartOnRectangleIcon className="size-6" />}></IconButton>
        </div>
      </div>
    </header>
  )
}

TopAppBar.propTypes = {
  children: PropTypes.node
}
