import { Button, ButtonGroup } from '@mui/material'
import PropTypes from 'prop-types'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

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
        startIcon={<AddRoundedIcon />}
        onClick={onNew}
        disabled={disabledButtons.includes('new')}
      >
        Nuevo
      </Button>
      <Button
        startIcon={<AutorenewRoundedIcon />}
        onClick={onUpdate}
        disabled={disabledButtons.includes('update')}
      >
        Actualizar
      </Button>
      <Button
        startIcon={<DeleteRoundedIcon />}
        onClick={onDelete}
        disabled={disabledButtons.includes('delete')}
      >
        Eliminar
      </Button>
    </ButtonGroup>
    // <div className="flex w-fit flex-row gap-2.5">
    //   <ActionButton
    //     label="Nuevo"
    //     icon={<PlusIcon className="size-4" />}
    //     onClick={onNew}
    //     disabled={disabledButtons.includes('new')}
    //   ></ActionButton>
    //   <ActionButton
    //     label="Actualizar"
    //     icon={<CheckIcon className="size-4" />}
    //     onClick={onUpdate}
    //     disabled={disabledButtons.includes('update')}
    //   ></ActionButton>
    //   <ActionButton
    //     label="Eliminar"
    //     icon={<XMarkIcon className="size-4" />}
    //     onClick={onDelete}
    //     disabled={disabledButtons.includes('delete')}
    //   ></ActionButton>
    // </div>
  )
}
