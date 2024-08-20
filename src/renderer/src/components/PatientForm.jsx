import ActionButton from './ActionButton'
import FormField from './FormField'
import { PlusIcon, CheckIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'

export default function PatientForm() {
  // TODO: Verificar los paddings de cada row del form

  return (
    <div className="size-full flex flex-col p-5 gap-5">
      <div className="w-full flex flex-col justify-start items-center gap-3.5">
        <div className="w-full flex flex-row justify-between items-end">
          <h2 className="text-2xl">Identificación del paciente</h2>
          <div className="w-fit flex flex-row gap-2.5">
            <ActionButton label="Nuevo" icon={<PlusIcon className="size-4" />}></ActionButton>
            <ActionButton label="Actualizar" icon={<CheckIcon className="size-4" />}></ActionButton>
            <ActionButton label="Eliminar" icon={<XMarkIcon className="size-4" />}></ActionButton>
          </div>
        </div>
        <div className="border-secondary border-t w-full"></div>
      </div>
      <div className="w-full flex flex-row gap-5 pt-2.5">
        <FormField label="Nombre" name="patient-name"></FormField>
        <FormField label="Sexo" name="patient-gender" cssWidth="w-24"></FormField>
        <FormField label="Estado civil" name="patient-marital-status" cssWidth="w-24"></FormField>
      </div>
      <div className="w-full flex flex-row gap-5 pt-2.5">
        <FormField label="Fecha de nacimiento" name="patient-birthdate" cssWidth="w-80"></FormField>
        <FormField label="Edad" name="patient-age" cssWidth="w-40"></FormField>
        <FormField label="ID" name="patient-id"></FormField>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-5">
        <div className="flex flex-col flex-grow gap-5">
          <FormField label="Aseguradora" name="patient-insurance" cssWidth="w-full"></FormField>
          <FormField label="Email" name="patient-email" cssWidth="w-full"></FormField>
          <FormField
            label="Domicilio"
            name="patient-home"
            cssWidth="w-full"
            cssHeight="h-28"
          ></FormField>
        </div>
        <UserIcon className="size-60"></UserIcon>
      </div>
      <div className="w-full flex flex-row gap-5 pt-2.5">
        <FormField
          label="Teléfonos"
          name="patient-phone"
          cssWidth="w-60"
          cssHeight="h-28"
        ></FormField>
        <FormField label="Otros datos" name="patient-other-data" cssHeight="h-28"></FormField>
      </div>
    </div>
  )
}
