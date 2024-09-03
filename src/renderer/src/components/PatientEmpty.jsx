import { UserIcon } from '@heroicons/react/24/outline'

export default function PatientEmpty() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3.5">
      <UserIcon className="size-32"></UserIcon>
      <p className="text-center">
        Seleccione un paciente o cree uno nuevo. <br /> Si necesita ayuda, puede consultar el manual
        de usuario.
      </p>
    </div>
  )
}
