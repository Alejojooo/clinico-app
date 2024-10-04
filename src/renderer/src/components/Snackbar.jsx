import { InformationCircleIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// TODO: Arreglar la visualización de los snackbars al momento de aparecer/desaparecer

SnackbarPile.propTypes = {
  snackbars: PropTypes.array,
  onRemove: PropTypes.func
}

export function SnackbarPile({ snackbars }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2">
      {snackbars.map(({ id, message }) => (
        <Snackbar key={id} message={message}></Snackbar>
      ))}
    </div>
  )
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired
}

export function Snackbar({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000)
  }, [])

  return (
    <div
      className={`flex flex-row gap-2.5 rounded-lg border bg-neutral px-4 py-3 text-primary shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <InformationCircleIcon className="size-6" />
      <span className="block w-96 text-sm">{message}</span>
    </div>
  )
}
