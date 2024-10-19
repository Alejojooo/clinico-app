import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

DataField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string
}

export default function DataField({ children, label }) {
  return (
    <Box
      sx={{
        // width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: 0
      }}
    >
      <Typography variant="subtitle2" component="span" sx={{ fontWeight: '600' }}>
        {label}
      </Typography>
      <Typography variant="body1" component="span">
        {children}
      </Typography>
    </Box>
  )
}
