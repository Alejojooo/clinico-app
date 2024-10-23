import { MedicalRecordProvider } from '../../context/medicalRecord'
import useView from '../../hooks/useView'
import { PATIENT_SECTIONS } from '../../utils/view'
import MedicalRecordPhotosSection from './MedicalRecordPhotosSection'
import MedicalRecordSection from './MedicalRecordSection'
import PatientIdentificationSection from './PatientIdentificationSection'
import PrescritionSection from './PrescriptionSection'

export default function PatientModule() {
  const { activeSection } = useView()

  switch (activeSection) {
    case PATIENT_SECTIONS.IDENTIFICATION: {
      return <PatientIdentificationSection />
    }
    case PATIENT_SECTIONS.MEDICAL_RECORDS: {
      return (
        <MedicalRecordProvider>
          <MedicalRecordSection />
        </MedicalRecordProvider>
      )
    }
    case PATIENT_SECTIONS.MEDICAL_RECORDS_PHOTOS: {
      return (
        <MedicalRecordProvider>
          <MedicalRecordPhotosSection />
        </MedicalRecordProvider>
      )
    }
    case PATIENT_SECTIONS.PRESCRIPTION: {
      return (
        <MedicalRecordProvider>
          <PrescritionSection />
        </MedicalRecordProvider>
      )
    }
  }
}
