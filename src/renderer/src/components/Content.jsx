import { useView } from '../hooks/useView'
import { MODULES } from '../utils/view'
import AgendaModule from './Agenda/AgendaModule'
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
    case MODULES.AGENDA: {
      return <AgendaModule></AgendaModule>
    }
  }
}
