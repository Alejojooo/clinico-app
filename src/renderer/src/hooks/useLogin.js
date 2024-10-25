import { useState } from 'react'
import { MODULES } from '../utils/view'
import useUser from './useUser'
import useView from './useView'

const initialFormData = {
  username: '',
  password: ''
}

const initialErrors = {}

export default function useLogin() {
  const { changeModule } = useView()
  const { setCurrentUser } = useUser()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)

  const handleField = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  const handleLogin = async () => {
    setLoading(true)
    const { username, password } = formData
    const { outcome, payload } = await window.user.login(username, password)
    setLoading(false)
    console.log(outcome, payload)
    if (outcome === 'success') {
      setCurrentUser(payload)
      if (payload.role === 'A') {
        changeModule(MODULES.ADMIN)
      } else {
        changeModule(MODULES.PATIENT)
      }
    } else {
      setErrors(payload)
    }
  }

  return { formData, errors, loading, handleField, handleKeyPress, handleLogin }
}
