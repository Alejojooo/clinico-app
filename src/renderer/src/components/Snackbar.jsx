import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  onRemove: PropTypes.func
}

export function Snackbar({ message, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)

    const timeout = setTimeout(() => {
      setVisible(false)
      setTimeout(onRemove, 300)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [onRemove])

  return (
    <div
      className={`flex flex-row gap-2.5 rounded-lg border bg-neutral px-4 py-3 text-primary shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <InformationCircleIcon className="size-6" />
      <span className="block w-96 text-sm">{message}</span>
    </div>
  )
}

SnackbarPile.propTypes = {
  snackbars: PropTypes.array,
  onRemove: PropTypes.func
}

export function SnackbarPile({ snackbars, onRemove }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2">
      {snackbars.map(({ id, message }) => (
        <Snackbar key={id} message={message} onRemove={() => onRemove(id)}></Snackbar>
      ))}
    </div>
  )
}
