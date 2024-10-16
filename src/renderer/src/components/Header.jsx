import PropTypes from 'prop-types'
import CrudButtons from './Buttons/CrudButtons'
import { Box, Typography } from '@mui/material'

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handlers: PropTypes.object,
  disabledButtons: PropTypes.array
}

export default function Header({ title, handlers, disabledButtons }) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-3.5">
      <div className="flex w-full flex-row items-end justify-between">
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <CrudButtons
          onNew={handlers?.onNew}
          onUpdate={handlers?.onUpdate}
          onDelete={handlers?.onDelete}
          disabledButtons={disabledButtons}
        ></CrudButtons>
      </div>
      <Box sx={{ borderTop: '1px solid', width: '100%', borderColor: 'alice-blue.main' }}></Box>
    </div>
  )
}
