import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { IconButton } from '@mui/material'
import { useView } from '../hooks/useView.js'
import { MODULES } from '../utils/view.js'
import SectionsLayout from './SectionsLayout.jsx'

export default function TopAppBar() {
  const { activeModule } = useView()

  return (
    <header className="flex h-16 w-screen flex-none flex-row items-center justify-start gap-5 px-5">
      <div className="flex w-[30%] flex-row items-center justify-start gap-2.5">
        <IconButton>
          <MenuOutlinedIcon />
        </IconButton>
        <h1 className="text-lg font-semibold">Clinico</h1>
      </div>
      <div className="flex flex-grow flex-row items-center justify-between">
        {(activeModule === MODULES.PATIENT || activeModule === MODULES.DRUG) && (
          <SectionsLayout></SectionsLayout>
        )}
        <div className="flex flex-row gap-2.5">
          <IconButton>
            <CloudSyncOutlinedIcon />
          </IconButton>
          <IconButton>
            <LogoutOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </header>
  )
}
