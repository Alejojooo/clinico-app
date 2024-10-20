import { InputBase, Paper, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  value: PropTypes.string,
  onInput: PropTypes.func
}

export default function SearchBar({ title, length, value, onInput }) {
  return (
    <Stack
      direction="column"
      spacing="0.5rem"
      sx={{ justifyContent: 'space-between', alignItems: 'flex-end', width: 1 }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '2rem',
          width: 1,
          padding: '0 1rem'
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h3">{length}</Typography>
      </Stack>
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: '0.25rem',
          height: '2.5rem',
          width: 1,
          padding: '0.25rem 0.25rem 0.25rem 1rem',
          backgroundColor: 'surface.main',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'accent.main'
          },
          '& .Mui-focused': {
            borderColor: 'secondary.main'
          }
        }}
      >
        <InputBase sx={{ flex: 1 }} placeholder="Buscar" value={value} onChange={onInput} />
      </Paper>
    </Stack>
  )
}
