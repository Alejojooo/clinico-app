import SectionButton from './SectionButton'
import { UserCircleIcon, Square3Stack3DIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function SectionsLayout() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-row divide-x py-1">
      <SectionButton
        label="Identificación"
        icon={<UserCircleIcon className="size-4" />}
        rounded="left"
        isActive={activeIndex === 0}
        onClick={() => setActiveIndex(0)}
      ></SectionButton>
      <SectionButton
        label="Historias"
        icon={<Square3Stack3DIcon className="size-4" />}
        isActive={activeIndex === 1}
        onClick={() => setActiveIndex(1)}
      ></SectionButton>
      <SectionButton
        label="Reporte"
        icon={<DocumentTextIcon className="size-4" />}
        rounded="right"
        isActive={activeIndex === 2}
        onClick={() => setActiveIndex(2)}
      ></SectionButton>
    </div>
  )
}
