import { useState } from 'react'
import { MODULES } from '../utils/view'
import useSnackbar from './useSnackbar'
import useUser from './useUser'
import useView from './useView'

const initialFormData = {
  username: '',
  password: ''
}

export default function useLogin() {
  const { changeModule, setActiveSection } = useView()
  const { showSnackbar } = useSnackbar()
  const { setActiveUser } = useUser()
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)

  const handleField = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  const handleLogin = async () => {
    setLoading(true)
    const { username, password } = formData
    const { outcome, payload } = await window.user.login(username, password)
    setLoading(false)
    if (outcome === 'success') {
      setActiveUser(payload)
      if (payload.role === 'A') {
        setActiveSection(MODULES.ADMIN)
      } else {
        changeModule(MODULES.PATIENT)
      }
    } else {
      showSnackbar(payload)
    }
  }

  return { formData, loading, handleField, handleKeyPress, handleLogin }
}
