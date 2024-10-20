import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const theme = createTheme({
  cssVariables: true,
  typography: {
    h1: {
      fontSize: '1.125rem',
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
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
