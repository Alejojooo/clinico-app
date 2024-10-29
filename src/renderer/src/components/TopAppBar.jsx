import styled from '@emotion/styled'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { IconButton, Stack, Typography } from '@mui/material'
import logo from '../assets/icon.png'
import useLogout from '../hooks/useLogout.js'
import SectionsLayout from './SectionsLayout.jsx'

const AppLogo = styled('img')({
  width: '2rem',
  height: '2rem'
})

export default function TopAppBar() {
  const { handleLogout } = useLogout()

  return (
    <Stack
      component="header"
      direction="row"
      spacing="1.25rem"
      sx={{
        width: '100vw',
        height: '4rem',
        flex: 'none',
        alignItems: 'center',
        padding: '0 1.25rem'
      }}
    >
      <Stack
        direction="row"
        spacing="0.625rem"
        sx={{
          width: '30%',
          alignItems: 'center',
          paddingLeft: '0.625rem'
        }}
      >
        <AppLogo src={logo} />
        <Typography variant="h1">Clínico</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <SectionsLayout />
        <Stack direction="row" spacing="0.625rem">
          {/* <IconButton>
            <CloudSyncOutlinedIcon />
          </IconButton> */}
          <IconButton onClick={handleLogout}>
            <LogoutOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
