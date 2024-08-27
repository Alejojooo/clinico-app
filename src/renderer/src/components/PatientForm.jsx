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
    const newErrors = copyObject(errors)
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
    console.log('newFormData:', newFormData)
    console.log('errors:', newErrors)
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
    if (!['M', 'F'].includes(value.toUpperCase())) return ['', 'El valor debe ser M o F']
    return [value.toUpperCase(), undefined]
  }

  const validateMaritalStatus = (value) => {
    if (!['S', 'C', 'D', 'V', 'U'].includes(value.toUpperCase()))
      return ['', 'El valor debe ser S, C, D, V o U']
    return [value.toUpperCase(), undefined]
  }

  const validateBirthdate = (value) => {
    const date = DateTime.fromFormat(value, 'D', { locale: 'es-GT' })
    if (!date) return [value, 'La fecha no es válida']
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
    const found = value.match(/[A-Za-z0-9]+/)
    if (!found)
      return [found ? found[0].toUpperCase() : value, 'El valor debe contener letras o números']
    return [found[0].toUpperCase(), undefined]
  }

  const handleNewPatient = () => {
    const formErrors = validate()
    if (Object.keys(formErrors).length > 0) {
      console.log('Form with errors:', formErrors)
      setErrors(formErrors)
    } else {
      // Procesar los datos del formulario
      console.log('Form submitted:', formData)
      // Limpiar el formulario si es necesario
      setFormData(EMPTY_FORM_DATA)
      setErrors({})
    }
  }

  return (
    <form className="flex flex-col p-5 gap-5 size-full">
      <div className="flex flex-col justify-start items-center gap-3.5 w-full">
        <div className="w-full flex flex-row justify-between items-end">
          <h2 className="text-2xl">Identificación del paciente</h2>
          <div className="w-fit flex flex-row gap-2.5">
            <ActionButton
              label="Nuevo"
              icon={<PlusIcon className="size-4" />}
              onClick={handleNewPatient}
            ></ActionButton>
            <ActionButton label="Actualizar" icon={<CheckIcon className="size-4" />}></ActionButton>
            <ActionButton label="Eliminar" icon={<XMarkIcon className="size-4" />}></ActionButton>
          </div>
        </div>
        <div className="border-secondary border-t w-full"></div>
      </div>
      <div className="flex flex-row gap-5 pt-2.5 w-full">
        <FormField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        ></FormField>
        <FormField
          label="Sexo"
          name="gender"
          cssWidth="w-24"
          value={formData.gender}
          onChange={handleChange}
        ></FormField>
        <FormField
          label="Estado civil"
          name="maritalStatus"
          cssWidth="w-24"
          value={formData.maritalStatus}
          onChange={handleChange}
        ></FormField>
      </div>
      <div className="flex flex-row gap-5 pt-2.5 w-full">
        <FormField
          label="Fecha de nacimiento"
          name="birthdate"
          cssWidth="w-80"
          value={formData.birthdate}
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
        <FormField label="ID" name="id" value={formData.id} onChange={handleChange}></FormField>
      </div>
      <div className="flex flex-row justify-start items-center gap-5 w-full ">
        <div className="flex flex-col flex-grow gap-5">
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
      <div className="flex flex-row gap-5 pt-2.5 w-full ">
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
