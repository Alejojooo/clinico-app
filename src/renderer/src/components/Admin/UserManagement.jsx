import { Button, Stack, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { BaseContainer, BaseSurface } from '../Base/Base'
import InfoBox from '../Base/InfoBox'
import CrudButtons from '../Buttons/CrudButtons'
import DataField from '../FormFields/DataField'
import Header from '../Header'
import SearchableDocumentList from '../SearchableDocumentList'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import useLogout from '../../hooks/useLogout'

const views = {
  create: 'create',
  list: 'list'
}

const titles = {
  [views.create]: 'Crear usuario',
  [views.list]: 'Usuarios'
}

export default function UserManagement() {
  const [view, setView] = useState(views.list)

  const handleNewUser = () => {
    setView(views.create)
    console.log(view)
  }

  return (
    <BaseSurface>
      <BaseContainer
        direction="column"
        spacing="1.25rem"
        sx={{ justifyContent: 'start', minHeight: '31.25rem' }}
      >
        <Header title={titles[view]}>
          {view === views.list && <CrudButtons onNew={handleNewUser} />}
        </Header>
        <View view={view} setView={setView} />
      </BaseContainer>
    </BaseSurface>
  )
}

View.propTypes = {
  view: PropTypes.string,
  setView: PropTypes.func
}

function View({ view, setView }) {
  switch (view) {
    case views.create:
      return <CreateView setView={setView} />
    case views.list:
      return <ListView />
  }
}

CreateView.propTypes = {
  setView: PropTypes.func
}

function CreateView({ setView }) {
  const handleSave = () => {
    // Lógica para guardar el usuario
    setView(views.list)
  }

  const handleCancel = () => {
    setView(views.list)
  }

  return (
    <Stack direction="column" spacing="1.25rem" sx={{ width: 1, height: 1 }}>
      <TextField label="Usuario" fullWidth />
      <TextField label="Nombre" fullWidth />
      <TextField label="Rol" fullWidth />
      <TextField label="Contraseña" fullWidth />
      <TextField label="Confirmar contraseña" fullWidth />
      <Stack direction="row" sx={{ justifyContent: 'space-evenly' }}>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Cancelar
        </Button>
      </Stack>
    </Stack>
  )
}

function ListView() {
  const { handleLogout } = useLogout()

  return (
    <Stack direction="row" spacing="2.5rem" sx={{ width: 1, height: 1 }}>
      <SearchableDocumentList
        title="Usuarios"
        activeDocument={null}
        documents={[]}
        handleDocSelection={null}
        sx={{ maxWidth: '12.5rem' }}
      />
      <Stack
        direction="column"
        sx={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, height: 1 }}
      >
        <InfoBox title="Información del usuario" sx={{ width: 1 }}>
          <DataField label="Usuario">admin</DataField>
          <DataField label="Nombre">admin</DataField>
          <DataField label="Rol">Administrador</DataField>
        </InfoBox>
        <Button
          variant="outlined"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          sx={{ width: 'fit-content' }}
        >
          Cerrar Sesión
        </Button>
      </Stack>
    </Stack>
  )
}
