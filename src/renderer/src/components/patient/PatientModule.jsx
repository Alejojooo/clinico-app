import { MedicalRecordProvider } from '../../context/medicalRecord'
import { useView } from '../../hooks/useView'
import { PATIENT_SECTIONS } from '../../utils/view'
import PatientIdentificationSection from './PatientIdentificationSection'
import MedicalRecordSection from './MedicalRecordSection'
import MedicalRecordPhotosSection from './MedicalRecordPhotosSection'

export default function PatientModule() {
  const { activeSection } = useView()

  switch (activeSection) {
    case PATIENT_SECTIONS.IDENTIFICATION: {
      return <PatientIdentificationSection></PatientIdentificationSection>
    }
    case PATIENT_SECTIONS.MEDICAL_RECORDS: {
      return (
        <MedicalRecordProvider>
          <MedicalRecordSection></MedicalRecordSection>
        </MedicalRecordProvider>
      )
    }
    case PATIENT_SECTIONS.MEDICAL_RECORDS_PHOTOS: {
      return (
        <MedicalRecordProvider>
          <MedicalRecordPhotosSection></MedicalRecordPhotosSection>
        </MedicalRecordProvider>
      )
    }
  }
}
