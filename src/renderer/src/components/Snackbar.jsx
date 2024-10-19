import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { IconButton } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// TODO: Arreglar la visualización de los snackbars al momento de aparecer/desaparecer

SnackbarPile.propTypes = {
  snackbars: PropTypes.array,
  onDismiss: PropTypes.func
}

export function SnackbarPile({ snackbars, onDismiss }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2">
      {snackbars.map(({ id, message, persistent }) => (
        <Snackbar
          key={id}
          message={message}
          persistent={persistent}
          onDismiss={() => onDismiss(id)}
        ></Snackbar>
      ))}
    </div>
  )
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  persistent: PropTypes.bool,
  onDismiss: PropTypes.func
}

export function Snackbar({ message, persistent, onDismiss }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!persistent) setTimeout(handleDismiss, 5000)
  }, [persistent])

  const handleDismiss = () => {
    setVisible(false)
    onDismiss()
  }

  return (
    <div
      className={`flex max-w-[400px] flex-row items-center gap-2.5 rounded-lg border bg-neutral px-4 py-3 text-primary shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <InfoOutlinedIcon />
      <span className="block w-96 text-sm">{message}</span>
      {!persistent && (
        // <IconButton
        //   icon={<XMarkIcon className="size-6" />}
        //   onClick={handleDismiss}
        //   noPadding
        //   alternative
        // ></IconButton>
        <IconButton
          onClick={handleDismiss}
          sx={{
            width: '1rem',
            height: '1rem',
            color: 'light.main'
          }}
        >
          <ClearOutlinedIcon />
        </IconButton>
      )}
    </div>
  )
}
