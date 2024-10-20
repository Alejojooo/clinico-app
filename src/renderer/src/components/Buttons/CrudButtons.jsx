import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Button, ButtonGroup } from '@mui/material'
import PropTypes from 'prop-types'

CrudButtons.propTypes = {
  onNew: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  disabledButtons: PropTypes.array
}

export default function CrudButtons({ onNew, onUpdate, onDelete, disabledButtons = [] }) {
  return (
    <ButtonGroup variant="outlined">
      <Button
        startIcon={<AddOutlinedIcon />}
        onClick={onNew}
        disabled={disabledButtons.includes('new')}
      >
        Nuevo
      </Button>
      <Button
        startIcon={<AutorenewOutlinedIcon />}
        onClick={onUpdate}
        disabled={disabledButtons.includes('update')}
      >
        Actualizar
      </Button>
      <Button
        startIcon={<DeleteOutlinedIcon />}
        onClick={onDelete}
        disabled={disabledButtons.includes('delete')}
      >
        Eliminar
      </Button>
    </ButtonGroup>
  )
}
