import CrudButtons from './CrudButtons'
import DisplayField from './DisplayField'

export function PatientMedicalRecordSection() {
  return (
    <main className="size-full">
      <form className="flex size-full flex-col items-start justify-start gap-5 rounded-2xl bg-white px-5 py-5">
        <div className="flex w-full flex-row items-end justify-between">
          <h2 className="text-xl">Historia clínica</h2>
          <CrudButtons></CrudButtons>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2.5">
          <div className="flex w-full flex-row gap-6">
            <div className="flex grow flex-col items-start justify-start gap-2.5">
              <span className="w-full border-t border-secondary text-sm">Identificación</span>
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="size-full">
                  <DisplayField
                    name="Nombre:"
                    value="Jorge Alejandro Fernández de la Cruz"
                    size="full"
                  ></DisplayField>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <DisplayField name="Sexo:" value="M" gap="mr-[21px]"></DisplayField>
                  <DisplayField name="Edad:" value="22a10m"></DisplayField>
                  <DisplayField name="ID:" value="3243323001601" size="full"></DisplayField>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2.5">
              <span className="w-full border-t border-secondary text-sm">Historia Clínica</span>
              <div className="flex w-full flex-col items-start justify-start gap-2.5">
                <div className="size-full">
                  <DisplayField
                    name="Fecha y hora de elaboración:"
                    value="22/04/2022 10:00"
                    gap="space-between"
                  ></DisplayField>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4">
                  <label className="text-sm font-semibold" htmlFor="firstTime">
                    Primera vez:
                  </label>
                  <input id="firstTime" type="checkbox" className="size-4" />
                  <DisplayField name="Próxima cita:" value="10/08/2024 13:33"></DisplayField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
