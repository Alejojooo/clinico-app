import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// TODO: Arreglar la visualización de los snackbars al momento de aparecer/desaparecer

SnackbarPile.propTypes = {
  snackbars: PropTypes.array,
  onDismiss: PropTypes.func
}

export function SnackbarPile({ snackbars, onDismiss }) {
  return (
    <Stack
      direction="column"
      sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 50,
        alignItems: 'end',
        rowGap: '0.5rem'
      }}
    >
      {snackbars.map(({ id, message, persistent }) => (
        <Snackbar
          key={id}
          message={message}
          persistent={persistent}
          onDismiss={() => onDismiss(id)}
        ></Snackbar>
      ))}
    </Stack>
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
    <Stack
      direction="row"
      spacing="0.625rem"
      sx={{
        display: 'flex',
        maxWidth: '400px',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: 'primary.main',
        px: '1rem',
        py: '0.75rem',
        color: 'light.main',
        boxShadow: 3,
        transition: 'opacity 0.3s',
        opacity: visible ? 1 : 0
      }}
    >
      <InfoOutlinedIcon />
      <Typography variant="body2" sx={{ display: 'block', width: '24rem' }}>
        {message}
      </Typography>
      {!persistent && (
        <IconButton
          onClick={handleDismiss}
          sx={{ width: '1rem', height: '1rem', color: 'light.main' }}
        >
          <ClearOutlinedIcon />
        </IconButton>
      )}
    </Stack>
  )
}
