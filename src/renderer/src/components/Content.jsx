import { useView } from '../hooks/useView'
import { MODULES } from '../utils/view'
import DrugModule from './Drug/DrugModule'
import PatientModule from './Patient/PatientModule'

export default function Content() {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientModule></PatientModule>
    }
    case MODULES.DRUG: {
      return <DrugModule></DrugModule>
    }
  }
}
