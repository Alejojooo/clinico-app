import LoadingButton from '@mui/lab/LoadingButton'
import { FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material'
import useLogin from '../../hooks/useLogin'
import { BaseSurface, BaseContainer } from '../Base/Base'

export default function Login() {
  const { formData, errors, loading, handleField, handleKeyPress, handleLogin } = useLogin()

  return (
    <BaseSurface direction="column">
      <BaseContainer
        direction="column"
        spacing="2.25rem"
        sx={{
          justifyContent: 'center',
          width: '28.75rem',
          minWidth: '28.75rem',
          minHeight: '30rem'
        }}
      >
        <Typography variant="title" sx={{ alignSelf: 'start' }}>
          Iniciar sesión
        </Typography>
        <Stack
          direction="column"
          spacing="1.5rem"
          onKeyDown={handleKeyPress}
          sx={{ width: 1, '& .MuiFormControl-root .MuiFormLabel-root': { fontWeight: 500 } }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Usuario</FormLabel>
            <TextField
              id="username"
              name="username"
              variant="outlined"
              margin="dense"
              size="small"
              value={formData.username}
              onChange={handleField}
              error={Boolean(errors.username)}
              helperText={errors.username}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              margin="dense"
              size="small"
              value={formData.password}
              onChange={handleField}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
            />
          </FormControl>
        </Stack>
        <LoadingButton
          loading={loading}
          loadingIndicator="Iniciando sesión..."
          variant="contained"
          onClick={handleLogin}
          fullWidth
        >
          Iniciar Sesión
        </LoadingButton>
      </BaseContainer>
    </BaseSurface>
  )
}
