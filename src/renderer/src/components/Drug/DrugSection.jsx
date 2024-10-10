import { TextField } from '../FormFields/TextField'
import Header from '../Header'
import SideView from '../SideView'

export default function DrugSection() {
  return (
    <>
      <SideView activeDocument={null} documents={[]} handleDocSelection={null}></SideView>
      <DrugForm></DrugForm>
    </>
  )
}

function DrugForm() {
  return (
    <main className="h-full grow">
      <form className="flex size-full flex-col gap-3 rounded-2xl bg-white p-5">
        <Header title="Fármacos"></Header>
        <div className="flex w-full flex-row gap-5">
          <div className="flex h-full grow flex-col gap-5">
            <TextField label="Nombre comercial" width="w-full"></TextField>
            <TextField label="Nombre genérico" width="w-full"></TextField>
          </div>
          <div>Código QR</div>
        </div>
        <div className="flex w-full grow flex-row gap-5">
          <div className="flex size-full flex-col gap-3">
            <TextField
              label="Descripciones e indicaciones"
              height="h-full"
              width="w-full"
              multiline
            ></TextField>
            <TextField
              label="Contraindicaciones y efectos secundarios"
              height="h-full"
              width="w-full"
              multiline
            ></TextField>
          </div>
          <TextField label="Presentaciones y dosis" height="" width="w-full" multiline></TextField>
        </div>
        <TextField label="Laboratorio" width="w-full"></TextField>
      </form>
    </main>
  )
}
