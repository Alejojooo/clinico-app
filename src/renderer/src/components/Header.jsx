import PropTypes from 'prop-types'
import CrudButtons from './Buttons/CrudButtons'
import { Typography } from '@mui/material'

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handlers: PropTypes.object,
  disabledButtons: PropTypes.array
}

export default function Header({ title, handlers, disabledButtons }) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-3.5">
      <div className="flex w-full flex-row items-end justify-between">
        {/* <h2 className="text-xl">{title}</h2> */}
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
      <div className="w-full border-t border-secondary"></div>
    </div>
  )
}
