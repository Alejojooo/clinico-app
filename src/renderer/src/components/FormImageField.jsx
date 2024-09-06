import PropTypes from 'prop-types'
import {
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  CameraIcon,
  FolderIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import IconButton from './IconButton'
import { useState } from 'react'

FormImageField.propTypes = {
  image: PropTypes.string
}

export default function FormImageField({ image }) {
  const [imageVisible, setImageVisible] = useState(false)

  return (
    <div className="group relative size-60 overflow-clip rounded-3xl bg-primary">
      {!image && <UserIcon></UserIcon>}
      <div className="absolute inset-x-0 bottom-0 flex h-12 w-full flex-row justify-center gap-2 bg-secondary opacity-0 transition-opacity group-hover:opacity-100">
        <IconButton
          icon={imageVisible ? <EyeSlashIcon className="size-6" /> : <EyeIcon className="size-6" />}
          onClick={() => setImageVisible(!imageVisible)}
        />
        <IconButton icon={<CameraIcon className="size-6" />} />
        <IconButton icon={<FolderIcon className="size-6" />} />
        <IconButton icon={<TrashIcon className="size-6" />} />
      </div>
    </div>
  )
}
