import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import ActionButton from './ActionButton'

CrudButtons.propTypes = {
  onNewPatient: PropTypes.func,
  onUpdatePatient: PropTypes.func,
  onDeletePatient: PropTypes.func
}

export default function CrudButtons({ onNewPatient, onUpdatePatient, onDeletePatient }) {
  return (
    <div className="flex w-fit flex-row gap-2.5">
      <ActionButton
        label="Nuevo"
        icon={<PlusIcon className="size-4" />}
        onClick={onNewPatient}
      ></ActionButton>
      <ActionButton
        label="Actualizar"
        icon={<CheckIcon className="size-4" />}
        onClick={onUpdatePatient}
      ></ActionButton>
      <ActionButton
        label="Eliminar"
        icon={<XMarkIcon className="size-4" />}
        onClick={onDeletePatient}
      ></ActionButton>
    </div>
  )
}
