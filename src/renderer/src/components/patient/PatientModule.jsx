import { MedicalRecordProvider } from '../../context/medicalRecord'
import { useView } from '../../hooks/useView'
import { PATIENT_SECTIONS } from '../../utils/view'
import PatientIdentificationSection from './PatientIdentificationSection'
import PatientMedicalRecordSection from './PatientMedicalRecordSection'

export default function PatientModule() {
  const { activeSection } = useView()

  switch (activeSection) {
    case PATIENT_SECTIONS.IDENTIFICATION: {
      return <PatientIdentificationSection></PatientIdentificationSection>
    }
    case PATIENT_SECTIONS.MEDICAL_RECORDS: {
      return (
        <MedicalRecordProvider>
          <PatientMedicalRecordSection></PatientMedicalRecordSection>
        </MedicalRecordProvider>
      )
    }
  }
}
