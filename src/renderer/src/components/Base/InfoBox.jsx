import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

InfoBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object
}

export default function InfoBox({ title, children, sx }) {
  return (
    <Stack direction="column" spacing="1.25rem" sx={sx}>
      {title && <Typography variant="h3">{title}</Typography>}
      <Stack direction="column" spacing="0.625rem">
        {children}
      </Stack>
    </Stack>
  )
}
