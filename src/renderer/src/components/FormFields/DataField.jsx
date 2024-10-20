import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

DataField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string
}

export default function DataField({ children, label }) {
  return (
    <Stack
      direction="column"
      sx={{ paddingRight: '0.75rem', borderRight: 1, borderColor: 'outline.main' }}
    >
      <Typography variant="label">{label}</Typography>
      <Typography variant="body1" component="span">
        {children}
      </Typography>
    </Stack>
  )
}
