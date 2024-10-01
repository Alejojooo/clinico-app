import { useView } from '../hooks/useView'
import { MODULES } from '../utils/view'
import PatientModule from './patient/PatientModule'

export default function Content() {
  const { activeModule } = useView()

  switch (activeModule) {
    case MODULES.PATIENT: {
      return <PatientModule></PatientModule>
    }
  }
}
