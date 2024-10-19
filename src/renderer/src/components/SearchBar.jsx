import { InputBase, Paper, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

DocumentListTitle.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
}

function DocumentListTitle({ title, length }) {
  return (
    <Stack
      direction="row"
      sx={{
        height: '2rem',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      <Typography variant="subtitle1" component="h3" sx={{ fontWeight: '500' }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="span" sx={{ fontWeight: '500' }}>
        {length}
      </Typography>
    </Stack>
  )
}

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
      sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}
      gap={1}
    >
      <DocumentListTitle title={title} length={length}></DocumentListTitle>
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          height: '2.5rem',
          width: '100%',
          justifyContent: 'start',
          alignItems: 'center',
          gap: '0.25rem',
          // borderRadius: '1rem',
          backgroundColor: 'antiflash-white.main',
          padding: '0.25rem 0.25rem 0.25rem 1rem'
        }}
      >
        <InputBase sx={{ flex: 1 }} placeholder="Buscar" value={value} onChange={onInput} />
      </Paper>
    </Stack>
  )
}
