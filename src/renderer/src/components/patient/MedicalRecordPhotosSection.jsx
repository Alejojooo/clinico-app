import {
  ArrowLeftIcon,
  CameraIcon,
  FolderIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'
import SegmentedButton from '../Buttons/SegmentedButton'
import FilterableDocumentList from '../FilterableDocumentList'
import { SimpleTextField } from '../FormFields/TextField'
import ActionButton from '../Buttons/ActionButton'
import IconButton from '../Buttons/IconButton'
import { useView } from '../../hooks/useView'
import { PATIENT_SECTIONS } from '../../utils/view'
import useMedicalRecord from '../../hooks/useMedicalRecord'

import { useState } from 'react'

export default function MedicalRecordPhotosSection() {
  const [photos, setPhotos] = useState([])

  const { activeMedicalRecord } = useMedicalRecord()
  const { setActiveSection } = useView()

  useEffect(() => {
    getPhotos()
  }, [])

  const getPhotos = () => {}

  return (
    <main className="flex size-full flex-row gap-5 px-5 py-5">
      <div className="flex w-1/4 flex-col gap-5">
        <button
          type="button"
          className="flex w-full flex-row items-center gap-2.5 border-b border-secondary pb-1"
          onClick={() => setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS)}
        >
          <ArrowLeftIcon className="size-5" />
          <span className="text-base">Volver al historial clínico</span>
        </button>
        <FilterableDocumentList
          activeDocument={null}
          documents={[]}
          handleDocSelection={null}
          title="Imágenes"
        ></FilterableDocumentList>
        <div className="flex w-full flex-col gap-2.5">
          <span className="text-sm font-semibold">Insertar desde</span>
          <div className="flex flex-row">
            <SegmentedButton
              className="border-r"
              icon={<FolderIcon className="size-4" />}
              label="Archivo"
              rounded="left"
            ></SegmentedButton>
            <SegmentedButton
              icon={<CameraIcon className="size-4" />}
              label="Cámara"
              rounded="right"
            ></SegmentedButton>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <span className="text-sm font-semibold">Acciones</span>
          <div className="flex flex-row">
            <SegmentedButton
              className="border-r"
              icon={<DocumentArrowDownIcon className="size-4" />}
              label="Guardar"
              rounded="left"
            ></SegmentedButton>
            <SegmentedButton
              icon={<XMarkIcon className="size-4" />}
              label="Eliminar"
              rounded="right"
            ></SegmentedButton>
          </div>
        </div>
      </div>
      <div className="flex h-full grow flex-col gap-2.5">
        <div className="flex w-full flex-row items-center gap-5">
          <SimpleTextField label="Descripción" value="Texto de ejemplo" readOnly></SimpleTextField>
          <div className="flex flex-row items-center gap-2.5">
            <ActionButton
              icon={<ArrowPathIcon className="size-4" />}
              label="Actualizar"
            ></ActionButton>
            <div className="flex size-10 items-center justify-center">
              <IconButton icon={<ArrowsPointingOutIcon className="size-5" />} solid></IconButton>
            </div>
          </div>
        </div>
        <div className="flex size-full items-center justify-center overflow-clip rounded-2xl bg-white">
          <img className="object-cover" />
        </div>
      </div>
    </main>
  )
}
