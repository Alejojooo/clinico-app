import { Box, createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ViewProvider } from './context/view'
import { SnackbarProvider } from './context/snackbar'
import { UserProvider } from './context/user'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const theme = createTheme({
  cssVariables: true,
  typography: {
    title: {
      fontSize: '2rem',
      lineHeight: '2.5rem',
      fontWeight: 700
    },
    h1: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 500
    },
    label: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 500
    },
    fontFamily: 'Inter, Arial, sans-serif'
  },
  palette: {
    primary: { main: '#647994' },
    secondary: { main: '#BECEDD' },
    light: { main: '#FAF9F3' },
    outline: { main: '#D5DCE6' },
    surface: { main: '#EAEEF3' },
    accent: { main: '#193152' }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          title: 'h1',
          label: 'span'
        }
      }
    },
    MuiPopover: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement
      }
    }
  }
})

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <Box direction="column" sx={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <ViewProvider>
              <UserProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </UserProvider>
            </ViewProvider>
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
