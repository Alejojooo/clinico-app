import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import ActionButton from './ActionButton'

CrudButtons.propTypes = {
  onNew: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
}

export default function CrudButtons({ onNew, onUpdate, onDelete }) {
  return (
    <div className="flex w-fit flex-row gap-2.5">
      <ActionButton
        label="Nuevo"
        icon={<PlusIcon className="size-4" />}
        onClick={onNew}
      ></ActionButton>
      <ActionButton
        label="Actualizar"
        icon={<CheckIcon className="size-4" />}
        onClick={onUpdate}
      ></ActionButton>
      <ActionButton
        label="Eliminar"
        icon={<XMarkIcon className="size-4" />}
        onClick={onDelete}
      ></ActionButton>
    </div>
  )
}
