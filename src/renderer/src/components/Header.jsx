import { Box, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  disableDivider: PropTypes.bool
}

export default function Header({ children, title, disableDivider = false }) {
  return (
    <Stack component="header" direction="column" sx={{ width: 1, alignItems: 'center' }}>
      <Stack
        direction="row"
        sx={{ width: 1, height: '2.5rem', justifyContent: 'space-between', alignItems: 'end' }}
      >
        <Typography variant="h6" component="h2" sx={{ lineHeight: 1 }}>
          {title}
        </Typography>
        {children}
      </Stack>
      {!disableDivider && (
        <Box
          sx={{
            marginTop: '0.75rem',
            borderTop: '1px solid',
            width: 1,
            borderColor: 'outline.main'
          }}
        ></Box>
      )}
    </Stack>
  )
}
