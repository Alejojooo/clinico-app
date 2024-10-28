import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import useAdmin, { VIEWS } from '../../hooks/useAdmin'
import useLogout from '../../hooks/useLogout'
import { BaseContainer, BaseSurface } from '../Base/Base'
import InfoBox from '../Base/InfoBox'
import SplitButton from '../Base/SplitButton'
import DataField from '../FormFields/DataField'
import Header from '../Header'
import SearchableDocumentList from '../SearchableDocumentList'

export default function UserManagement() {
  const hook = useAdmin()

  return (
    <BaseSurface>
      <BaseContainer
        direction="column"
        spacing="1.25rem"
        sx={{ justifyContent: 'start', minHeight: '31.25rem' }}
      >
        <Header title={hook.title}>
          {hook.view === VIEWS.LIST && (
            <Stack direction="row" spacing="1rem">
              <Button
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                onClick={hook.handleCreateView}
              >
                Nuevo
              </Button>
              <SplitButton
                options={[
                  {
                    label: 'Actualizar',
                    func: hook.handleUpdateView,
                    icon: <AutorenewOutlinedIcon />
                  },
                  {
                    label: 'Cambiar contraseña',
                    func: hook.handleChangePasswordView,
                    icon: <KeyOutlinedIcon />
                  },
                  {
                    label: 'Eliminar',
                    func: hook.handleDelete,
                    icon: <DeleteOutlinedIcon />
                  }
                ]}
                disabled={!hook.activeUser}
              />
            </Stack>
          )}
        </Header>
        <View {...hook} />
      </BaseContainer>
    </BaseSurface>
  )
}

View.propTypes = {
  view: PropTypes.string,
  activeUser: PropTypes.object,
  users: PropTypes.array,
  formData: PropTypes.object,
  errors: PropTypes.object,
  handleField: PropTypes.func,
  handleSaveNew: PropTypes.func,
  handleSaveUpdate: PropTypes.func,
  handleSavePassword: PropTypes.func,
  handleCancel: PropTypes.func,
  handleUserSelection: PropTypes.func
}

function View({
  view,
  activeUser,
  users,
  formData,
  errors,
  handleField,
  handleSaveNew,
  handleSaveUpdate,
  handleSavePassword,
  handleCancel,
  handleUserSelection
}) {
  switch (view) {
    case VIEWS.CREATE:
      return (
        <CreateView
          formData={formData}
          errors={errors}
          onField={handleField}
          onSave={handleSaveNew}
          onCancel={handleCancel}
        />
      )
    case VIEWS.UPDATE:
      return (
        <UpdateView
          formData={formData}
          errors={errors}
          onField={handleField}
          onSave={handleSaveUpdate}
          onCancel={handleCancel}
        />
      )
    case VIEWS.CHANGE_PASSWORD:
      return (
        <UpdatePasswordView
          formData={formData}
          errors={errors}
          onField={handleField}
          onSave={handleSavePassword}
          onCancel={handleCancel}
        />
      )
    case VIEWS.LIST:
      return (
        <ListView activeUser={activeUser} users={users} onUserSelection={handleUserSelection} />
      )
  }
}

CreateView.propTypes = {
  formData: PropTypes.object,
  errors: PropTypes.object,
  onField: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

function CreateView({ formData, errors, onField, onSave, onCancel }) {
  return (
    <Stack direction="row" spacing="2rem">
      <Stack direction="column" spacing="2rem" sx={{ width: 1, maxWidth: '20rem', height: 1 }}>
        <Stack direction="column" spacing="1rem" sx={{ width: 1, flexGrow: 1 }}>
          <TextField
            id="username"
            name="username"
            label="Usuario"
            size="small"
            value={formData.username}
            onChange={onField}
            error={Boolean(errors.username)}
            helperText={errors.username ?? 'Será utilizado para iniciar sesión'}
            fullWidth
          />
          <TextField
            id="name"
            name="name"
            label="Nombre"
            size="small"
            value={formData.name}
            onChange={onField}
            error={Boolean(errors.name)}
            helperText={
              errors.name ?? 'Este nombre aparecerá en los registros de historias clínicas'
            }
            fullWidth
          />
          <Box sx={{ minWidth: 150 }}>
            <FormControl error={Boolean(errors.role)} fullWidth>
              <InputLabel id="role-label" size="small">
                Rol
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                label="Rol"
                size="small"
                value={formData.role}
                onChange={onField}
              >
                <MenuItem value="A">Administrador</MenuItem>
                <MenuItem value="C">Completo</MenuItem>
                <MenuItem value="P">Parcial</MenuItem>
              </Select>
              <FormHelperText>
                {errors.role ?? 'Parcial no tiene acceso a historias clínicas'}
              </FormHelperText>
            </FormControl>
          </Box>
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            size="small"
            value={formData.password}
            onChange={onField}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            value={formData.confirmPassword}
            onChange={onField}
            size="small"
            fullWidth
          />
        </Stack>
        <SaveCancelButtons onSave={onSave} onCancel={onCancel} />
      </Stack>
      <InfoBox title="Requisitos de usuario" sx={{ maxWidth: '15rem' }}>
        <ul>
          <li>
            <Typography variant="label">
              El usuario debe tener al menos 5 caracteres y no más de 20 caracteres
            </Typography>
          </li>
          <li>
            <Typography variant="label">
              Las contraseñas deben tener al menos 8 caracteres
            </Typography>
          </li>
          <li>
            <Typography variant="label">
              Las contraseñas deben tener al menos una letra mayúscula
            </Typography>
          </li>
          <li>
            <Typography variant="label">Las contraseñas deben tener al menos un número</Typography>
          </li>
          <li>
            <Typography variant="label">Las contraseñas deben coincidir</Typography>
          </li>
        </ul>
      </InfoBox>
    </Stack>
  )
}

UpdateView.propTypes = CreateView.propTypes

function UpdateView({ formData, errors, onField, onSave, onCancel }) {
  return (
    <Stack direction="row" spacing="2rem">
      <Stack direction="column" spacing="2rem" sx={{ width: 1, maxWidth: '20rem', height: 1 }}>
        <Stack direction="column" spacing="1rem" sx={{ width: 1, flexGrow: 1 }}>
          <TextField
            id="username"
            name="username"
            label="Usuario"
            size="small"
            value={formData.username}
            onChange={onField}
            error={Boolean(errors.username)}
            helperText={errors.username}
            fullWidth
          />
          <TextField
            id="name"
            name="name"
            label="Nombre"
            size="small"
            value={formData.name}
            onChange={onField}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />
          <Box sx={{ minWidth: 150 }}>
            <FormControl error={Boolean(errors.role)} fullWidth>
              <InputLabel id="role-label" size="small">
                Rol
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                label="Rol"
                size="small"
                value={formData.role}
                onChange={onField}
              >
                <MenuItem value="A">Administrador</MenuItem>
                <MenuItem value="C">Completo</MenuItem>
                <MenuItem value="P">Parcial</MenuItem>
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </Box>
        </Stack>
        <SaveCancelButtons onSave={onSave} onCancel={onCancel} />
      </Stack>
      <InfoBox sx={{ maxWidth: '15rem' }}>
        <Typography variant="body1">
          Para cambiar la contraseña del usuario, seleccione la opción desde el botón desplegable,
          en el menú principal.
        </Typography>
      </InfoBox>
    </Stack>
  )
}

UpdatePasswordView.propTypes = CreateView.propTypes

function UpdatePasswordView({ formData, errors, onField, onSave, onCancel }) {
  return (
    <Stack direction="row" spacing="2rem">
      <Stack direction="column" spacing="2rem" sx={{ width: 1, maxWidth: '20rem', height: 1 }}>
        <Stack direction="column" spacing="1rem" sx={{ width: 1, flexGrow: 1 }}>
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            size="small"
            value={formData.password}
            onChange={onField}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            value={formData.confirmPassword}
            onChange={onField}
            size="small"
            fullWidth
          />
        </Stack>
        <SaveCancelButtons onSave={onSave} onCancel={onCancel} />
      </Stack>
      <InfoBox title="Requisitos de contraseña" sx={{ maxWidth: '15rem' }}>
        <ul>
          <li>
            <Typography variant="label">
              Las contraseñas deben tener al menos 8 caracteres
            </Typography>
          </li>
          <li>
            <Typography variant="label">
              Las contraseñas deben tener al menos una letra mayúscula
            </Typography>
          </li>
          <li>
            <Typography variant="label">Las contraseñas deben tener al menos un número</Typography>
          </li>
          <li>
            <Typography variant="label">Las contraseñas deben coincidir</Typography>
          </li>
        </ul>
      </InfoBox>
    </Stack>
  )
}

ListView.propTypes = {
  activeUser: PropTypes.object,
  users: PropTypes.array,
  onUserSelection: PropTypes.func
}

function ListView({ activeUser, users, onUserSelection }) {
  const { handleLogout } = useLogout()

  const getReadableRole = (role) => {
    switch (role) {
      case 'A':
        return 'Administrador'
      case 'C':
        return 'Completo'
      case 'P':
        return 'Parcial'
    }
  }

  return (
    <Stack direction="row" spacing="2.5rem" sx={{ width: 1, height: 1 }}>
      <SearchableDocumentList
        activeDocument={activeUser}
        documents={users}
        handleDocSelection={onUserSelection}
        sx={{ maxWidth: '12.5rem', height: '25rem' }}
      />
      <Stack
        direction="column"
        sx={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, height: 1 }}
      >
        {activeUser ? (
          <InfoBox title="Información del usuario" sx={{ width: 1 }}>
            <DataField label="Usuario">{activeUser.username}</DataField>
            <DataField label="Nombre">{activeUser.name}</DataField>
            <DataField label="Rol">{getReadableRole(activeUser.role)}</DataField>
          </InfoBox>
        ) : (
          <Typography variant="body1">Seleccione un usuario para ver su información</Typography>
        )}
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

SaveCancelButtons.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

function SaveCancelButtons({ onSave, onCancel }) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-evenly' }}>
      <Button variant="contained" startIcon={<SaveOutlinedIcon />} onClick={onSave}>
        Guardar
      </Button>
      <Button variant="contained" startIcon={<ClearOutlinedIcon />} onClick={onCancel}>
        Cancelar
      </Button>
    </Stack>
  )
}
