import PropTypes from 'prop-types'
import { useView } from '../hooks/useView'
import { MODULES } from '../constants'
import FilterableRecordList from './FilterableRecordList'

import {
  ArchiveBoxIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import ModuleButton from './ModuleButton'

function ModulesLayout() {
  const { activeModule, changeModule } = useView()

  return (
    <nav className="flex h-fit w-full flex-col">
      <ModuleButton
        name="Pacientes"
        icon={<UserGroupIcon className="size-6" />}
        isActive={activeModule === MODULES.PATIENT}
        onClick={() => changeModule(MODULES.PATIENT)}
      ></ModuleButton>
      <ModuleButton
        name="Fármacos"
        icon={<ArchiveBoxIcon className="size-6" />}
        isActive={activeModule === MODULES.DRUG}
        onClick={() => changeModule(MODULES.DRUG)}
      ></ModuleButton>
      <ModuleButton
        name="Agenda"
        icon={<BookOpenIcon className="size-6" />}
        isActive={activeModule === MODULES.AGENDA}
        onClick={() => changeModule(MODULES.AGENDA)}
      ></ModuleButton>
      <ModuleButton
        name="Herramientas"
        icon={<Cog6ToothIcon className="size-6" />}
        isActive={activeModule === MODULES.TOOLS}
        onClick={() => changeModule(MODULES.TOOLS)}
      ></ModuleButton>
    </nav>
  )
}

SideView.propTypes = {
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func
}

export default function SideView({ documents, activeDocument, handleDocSelection }) {
  const { activeModule } = useView()

  return (
    <aside className="mt-2.5 flex w-[30%] flex-col items-center justify-start gap-3.5">
      <ModulesLayout></ModulesLayout>
      {(activeModule === MODULES.PATIENT || activeModule === MODULES.DRUG) && (
        <FilterableRecordList
          title={`Listado de ${activeModule === MODULES.PATIENT ? 'pacientes' : 'medicamentos'}`}
          documents={documents}
          activeDocument={activeDocument}
          handleDocSelection={handleDocSelection}
        ></FilterableRecordList>
      )}
    </aside>
  )
}
