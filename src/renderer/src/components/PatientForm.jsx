import ActionButton from './ActionButton'
import FormField from './FormField'
import { PlusIcon, CheckIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { DateTime, Interval } from 'luxon'

export default function PatientForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    const [newFormData, newErrors] = validate({
      ...formData,
      [name]: value
    })
    setFormData(newFormData)
    setErrors(newErrors)
  }

  const validate = (formData) => {
    const newFormData = copyObject(formData)
    const newErrors = {}
    Object.keys(formData).forEach((field) => {
      let value, error
      // Validaciones
      if (field === 'name') [value, error] = validateName(formData[field])
      else if (field === 'gender') [value, error] = validateGender(formData[field])
      else if (field === 'maritalStatus') [value, error] = validateMaritalStatus(formData[field])
      else if (field === 'birthdate') {
        ;[value, error] = validateBirthdate(formData[field])
        newFormData.age = calculateAge(value)
      } else if (field === 'id') [value, error] = validateId(formData[field])
      else value = newFormData[field]
      // Después de validar los datos, hay que devolverlos al form
      newFormData[field] = value
      if (error) newErrors[field] = error
    })
    return [newFormData, newErrors]
  }

  const copyObject = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([name, value]) => [name, value === undefined ? '' : value])
    )
  }

  const validateName = (value) => {
    if (!value) return [value, 'El nombre es requerido']
    return [value, undefined]
  }

  const validateGender = (value) => {
    if (value && !['M', 'F'].includes(value.toUpperCase())) return ['', 'M/F']
    return [value.toUpperCase(), undefined]
  }

  const validateMaritalStatus = (value) => {
    if (value && !['S', 'C', 'D', 'V', 'U'].includes(value.toUpperCase())) return ['', 'S/C/D/V/U']
    return [value.toUpperCase(), undefined]
  }

  const validateBirthdate = (value) => {
    if (!value) return [value, undefined]
    const date = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
    if (!date.isValid) return [value, 'La fecha no es válida']
    return [value, undefined]
  }

  const calculateAge = (date) => {
    const birthdate = DateTime.fromFormat(date, 'D', { locale: 'es-GT' })
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

  const validateId = (value) => {
    if (!value) return [value, undefined]
    const found = value.match(/[A-Za-z0-9]+/)
    if (!found) return [value.toUpperCase(), 'El valor debe contener letras o números']
    return [found[0].toUpperCase(), undefined]
  }

  const handleNewPatient = () => {
    if (Object.keys(errors).length > 0) {
      console.log('Form with errors:', errors)
    } else {
      // Procesar los datos del formulario
      console.log('Form submitted:', formData)
      // Limpiar el formulario si es necesario
      setFormData(EMPTY_FORM_DATA)
      setErrors({})
    }
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
            <ActionButton label="Actualizar" icon={<CheckIcon className="size-4" />}></ActionButton>
            <ActionButton label="Eliminar" icon={<XMarkIcon className="size-4" />}></ActionButton>
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
          onChange={handleChange}
        ></FormField>
        <FormField
          label="Estado civil"
          name="maritalStatus"
          cssWidth="w-24"
          value={formData.maritalStatus}
          error={errors.maritalStatus}
          onChange={handleChange}
        ></FormField>
      </div>
      <div className="flex w-full flex-row gap-5">
        <FormField
          label="Fecha de nacimiento"
          name="birthdate"
          cssWidth="w-80"
          value={formData.birthdate}
          error={errors.birthdate}
          onChange={handleChange}
        ></FormField>
        <FormField
          label="Edad"
          name="age"
          cssWidth="w-40"
          value={formData.age}
          onChange={handleChange}
          nonEditable
        ></FormField>
        <FormField
          label="ID"
          name="id"
          value={formData.id}
          error={errors.id}
          onChange={handleChange}
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
