import { MODULES } from '../utils/view'
import useUser from './useUser'
import useView from './useView'

export default function useLogout() {
  const { setActiveUser } = useUser()
  const { changeModule } = useView()

  const handleLogout = async () => {
    const option = await window.dialog.showConfirmDialog(
      'Cerrar sesión',
      '¿Está seguro de cerrar sesión?'
    )
    if (option === window.dialog.OK_OPTION) {
      setActiveUser(null)
      changeModule(MODULES.SESSION)
    }
  }

  return { handleLogout }
}
