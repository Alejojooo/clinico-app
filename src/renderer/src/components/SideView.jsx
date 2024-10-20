import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PropTypes from 'prop-types'
import { useView } from '../hooks/useView'
import { MODULES } from '../utils/view'
import ModuleButton from './Buttons/ModuleButton'
import { Stack } from '@mui/material'

SideView.propTypes = {
  children: PropTypes.node,
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func
}

export default function SideView({ children }) {
  return (
    <Stack
      component="aside"
      direction="column"
      spacing="0.875rem"
      sx={{
        alignItems: 'center',
        paddingTop: '0.625rem',
        width: '30%',
        minWidth: '30%',
        maxWidth: '25rem'
      }}
    >
      <ModulesLayout></ModulesLayout>
      {children}
    </Stack>
  )
}

function ModulesLayout() {
  const { activeModule, changeModule } = useView()

  return (
    <Stack
      direction="column"
      sx={{
        width: 1
      }}
    >
      <ModuleButton
        name="Pacientes"
        icon={<PeopleAltOutlinedIcon />}
        isActive={activeModule === MODULES.PATIENT}
        onClick={() => changeModule(MODULES.PATIENT)}
      />
      <ModuleButton
        name="Fármacos"
        icon={<MedicationOutlinedIcon />}
        isActive={activeModule === MODULES.DRUG}
        onClick={() => changeModule(MODULES.DRUG)}
      />
      <ModuleButton
        name="Agenda"
        icon={<ClassOutlinedIcon />}
        isActive={activeModule === MODULES.AGENDA}
        onClick={() => changeModule(MODULES.AGENDA)}
      />
    </Stack>
  )
}
