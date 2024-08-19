import { UserIcon } from '@heroicons/react/24/outline'

export default function PatientEmpty() {
  return (
    <div className="size-full flex flex-col justify-center items-center gap-3.5">
      <UserIcon className="size-32"></UserIcon>
      <p className="text-center">
        Seleccione un paciente o cree uno nuevo. <br /> Si necesita ayuda, puede consultar el manual
        de usuario.
      </p>
    </div>
  )
}
