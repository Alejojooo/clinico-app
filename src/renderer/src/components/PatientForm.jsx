import PropTypes from 'prop-types'
import ActionButton from './ActionButton'
import FormField from './FormField'
import { PlusIcon, CheckIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { DateTime, Interval } from 'luxon'

export default function PatientForm({
  patient,
  creatingPatient,
  handleChangeOnPatient,
  handleChangeOnDatabase,
  handleDeletePatient
}) {
  const EMPTY_FORM_DATA = {
    name: '',
    gender: '',
    maritalStatus: '',
    birthdate: '',
    age: '',
    id: '',
    insurance: '',
    email: '',
    home: '',
    phone: '',
    otherData: ''
  }

  const [formData, setFormData] = useState(EMPTY_FORM_DATA)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (patient) {
      patient.age = calculateAge(patient.birthdate)
      setFormData(patient)
    }
  }, [patient])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: undefined
    })
  }

  const handleGender = (e) => {
    let value = e.target.value.toUpperCase()
    if (!['M', 'F'].includes(value)) value = ''
    setFormData({
      ...formData,
      gender: value
    })
    setErrors({
      ...errors,
      gender: undefined
    })
  }

  const handleMaritalStatus = (e) => {
    let value = e.target.value.toUpperCase()
    if (!['S', 'C', 'D', 'V', 'U'].includes(value)) value = ''
    setFormData({
      ...formData,
      maritalStatus: value
    })
    setErrors({
      ...errors,
      maritalStatus: undefined
    })
  }

  const handleBirthdate = (e) => {
    const value = e.target.value
    const date = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
    let age = ''
    if (date.isValid) age = calculateAge(value)
    setFormData({
      ...formData,
      birthdate: value,
      age: age
    })
    setErrors({
      ...errors,
      birthdate: undefined
    })
  }

  const calculateAge = (value) => {
    const birthdate = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
    const duration = Interval.fromDateTimes(birthdate, DateTime.now())
      .toDuration(['years', 'months', 'days'])
      .toObject()
    if (Object.keys(duration).length === 0) return '0a'
    // De 0 a 1 año se cuentan los meses y días
    // De 1 a 12 años se cuentan los años y meses
    // A partir de los 13 años se dejan de contar los meses
    if (duration.years >= 13) return `${duration.years}a`
    else if (duration.years >= 1) return `${duration.years}a ${duration.months}m`
    else return `${duration.months}m ${Math.floor(duration.days)}d`
  }

  const handleId = (e) => {
    const value = e.target.value.toUpperCase().replace(/\W+/, '')
    setFormData({
      ...formData,
      id: value
    })
    setErrors({
      ...errors,
      id: undefined
    })
  }

  const handleNewPatient = async () => {
    if (creatingPatient) {
      const formErrors = await window.database.newPatient(formData)
      if (Object.keys(formErrors).length === 0) {
        setFormData(EMPTY_FORM_DATA)
      }
      setErrors(formErrors)
      handleChangeOnDatabase()
    } else {
      setFormData(EMPTY_FORM_DATA)
    }
    creatingPatient.current = !creatingPatient.current
  }

  const handleUpdatePatient = async () => {
    const formErrors = await window.database.updatePatient(formData)
    setErrors(formErrors)
    handleChangeOnDatabase()
  }

  return (
    <form className="flex size-full flex-col gap-3 p-5">
      <div className="flex w-full flex-col items-center justify-start gap-3.5">
        <div className="flex w-full flex-row items-end justify-between">
          <h2 className="text-2xl">Identificación del paciente</h2>
          <div className="flex w-fit flex-row gap-2.5">
            <ActionButton
              label="Nuevo"
              icon={<PlusIcon className="size-4" />}
              onClick={handleNewPatient}
            ></ActionButton>
            <ActionButton
              label="Actualizar"
              icon={<CheckIcon className="size-4" />}
              onClick={handleUpdatePatient}
            ></ActionButton>
            <ActionButton
              label="Eliminar"
              icon={<XMarkIcon className="size-4" />}
              onClick={handleDeletePatient}
            ></ActionButton>
          </div>
        </div>
        <div className="w-full border-t border-secondary"></div>
      </div>
      <div className="flex w-full flex-row gap-5">
        <FormField
          label="Nombre"
          name="name"
          value={formData.name}
          error={errors.name}
          onChange={handleChange}
        ></FormField>
        <FormField
          label="Sexo"
          name="gender"
          cssWidth="w-24"
          value={formData.gender}
          error={errors.gender}
          onChange={handleGender}
        ></FormField>
        <FormField
          label="Estado civil"
          name="maritalStatus"
          cssWidth="w-24"
          value={formData.maritalStatus}
          error={errors.maritalStatus}
          onChange={handleMaritalStatus}
        ></FormField>
      </div>
      <div className="flex w-full flex-row gap-5">
        <FormField
          label="Fecha de nacimiento"
          name="birthdate"
          cssWidth="w-80"
          value={formData.birthdate}
          error={errors.birthdate}
          onChange={handleBirthdate}
        ></FormField>
        <FormField
          label="Edad"
          name="age"
          cssWidth="w-40"
          value={formData.age}
          nonEditable
        ></FormField>
        <FormField
          label="ID"
          name="id"
          value={formData.id}
          error={errors.id}
          onChange={handleId}
        ></FormField>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-5">
        <div className="flex flex-grow flex-col gap-3">
          <FormField
            label="Aseguradora"
            name="insurance"
            cssWidth="w-full"
            value={formData.insurance}
            onChange={handleChange}
          ></FormField>
          <FormField
            label="Email"
            name="email"
            cssWidth="w-full"
            value={formData.email}
            onChange={handleChange}
          ></FormField>
          <FormField
            label="Domicilio"
            name="home"
            cssWidth="w-full"
            cssHeight="h-28"
            value={formData.home}
            onChange={handleChange}
            multiline
          ></FormField>
        </div>
        <UserIcon className="size-60"></UserIcon>
      </div>
      <div className="flex w-full flex-row gap-5">
        <FormField
          label="Teléfonos"
          name="phone"
          cssWidth="w-60"
          cssHeight="h-28"
          value={formData.phone}
          onChange={handleChange}
          multiline
        ></FormField>
        <FormField
          label="Otros datos"
          name="otherData"
          cssHeight="h-28"
          value={formData.otherData}
          onChange={handleChange}
          multiline
        ></FormField>
      </div>
    </form>
  )
}

PatientForm.propTypes = {
  patient: PropTypes.object,
  creatingPatient: PropTypes.object,
  handleChangeOnPatient: PropTypes.func,
  handleChangeOnDatabase: PropTypes.func,
  handleDeletePatient: PropTypes.func
}
