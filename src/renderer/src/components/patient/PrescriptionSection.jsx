import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import useMedicalRecord from '../../hooks/useMedicalRecord'
import usePatient from '../../hooks/usePatient'
import useSnackbar from '../../hooks/useSnackbar'
import { useView } from '../../hooks/useView'
import { PATIENT_SECTIONS } from '../../utils/view'
import SmallTextField from '../Base/SmallTextField'
import SplitButton from '../Base/SplitButton'
import DataField from '../FormFields/DataField'
import Header from '../Header'
import SearchableDocumentList, { DocumentList } from '../SearchableDocumentList'

export default function PrescritionSection() {
  const { activePatient, nextAppointment } = usePatient()
  const { activeMedicalRecord } = useMedicalRecord()
  const [drugs, setDrugs] = useState([])
  const [activeDrug, setActiveDrug] = useState(null)
  const [presentations, setPresentations] = useState([])
  const [activePresentation, setActivePresentation] = useState(null)
  const [prescription, setPrescription] = useState('')
  const { setActiveSection } = useView()
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    getDrugs()
  }, [])

  useEffect(() => {
    getPresentations()
  }, [activeDrug])

  const getDrugs = async () => {
    const drugs = await window.drug.getDrugs()
    setDrugs(drugs)
  }

  const getPresentations = () => {
    if (!activeDrug) return
    const newPresentations = activeDrug.presentations.split('\n')
    newPresentations.sort((a, b) => a.localeCompare(b))

    let index = 0
    setPresentations(
      newPresentations.map((presentation) => {
        index += 1
        return { _id: `${activeDrug._id}_${index}`, label: presentation }
      })
    )
  }

  const handlePrescription = (e) => {
    const { value } = e.target
    setPrescription(value.replace(/^[\s\n]+/, ''))
  }

  const handleDrugSelection = async (id) => {
    const drug = await window.drug.getDrugById(id)
    setActiveDrug(drug)
  }

  const handlePresentationSelection = (id) => {
    const presentation = presentations.find((presentation) => presentation._id === id)
    setActivePresentation(presentation)
  }

  const handleInsertDrug = () => {
    if (!activeDrug) {
      showSnackbar('Primero seleccione un medicamento')
      return
    } else {
      const newLine = `\n${activeDrug.tradeName}${activePresentation?.label ? `: ${activePresentation.label}` : ''}\n`
      const newPrescription = prescription + newLine
      handlePrescription({ target: { value: newPrescription } })
    }
  }

  const handleInsertDivider = () => {
    const newLine = `\n${'-'.repeat(70)}\n`
    const newPrescription = prescription + newLine
    handlePrescription({ target: { value: newPrescription } })
  }

  const handleMedicalRecordSection = () => {
    setActiveSection(PATIENT_SECTIONS.MEDICAL_RECORDS)
  }

  const handleDocxExport = async () => {
    const fields = getFields()
    const { outcome } = await window.doc.exportPrescriptionToDocx(fields)
    if (outcome === 'success') showSnackbar('Se exportó el archivo .docx')
    else if (outcome === 'canceled') showSnackbar('Se canceló la operación')
    else showSnackbar('Ocurrió un error al exportar. Revise la plantilla')
  }

  const getFields = () => {
    const fields = {
      ...activePatient,
      prescription: prescription,
      diagnose: activeMedicalRecord.diagnose,
      nextAppointment: nextAppointment ?? 'Sin registro'
    }
    // Eliminar campos innecesarios
    delete fields._id
    delete fields.medicalRecords

    // Transformar fechas
    fields.date = dayjs().format()
    const birthdate = activePatient.birthdate
    fields.birthdate = birthdate && birthdate instanceof dayjs ? birthdate.format() : ''

    return fields
  }

  const handlePrint = async () => {
    const fields = getFields()
    const { outcome } = await window.doc.printDocument(fields)
    if (outcome === 'success') showSnackbar('Se va a imprimir la receta')
    else if (outcome === 'canceled') showSnackbar('Se canceló la operación')
    else showSnackbar('Ocurrió un error al imprimir.')
  }

  const options = [
    { label: 'Imprimir', func: handlePrint, icon: <PrintOutlinedIcon /> },
    {
      label: 'Exportar como Docx',
      func: handleDocxExport,
      icon: <DescriptionOutlinedIcon />
    }
  ]

  return (
    <Box component="main" sx={{ height: 1, width: 1 }}>
      <Stack
        component="form"
        direction="column"
        spacing="0.625rem"
        sx={{
          width: 1,
          height: 1,
          padding: '1.25rem',
          backgroundColor: 'white',
          borderRadius: '1rem'
        }}
      >
        <Header title="Receta">
          <SplitButton options={options}></SplitButton>
        </Header>
        <Stack direction="row" spacing="1.25rem" sx={{ flexGrow: 1, width: 1 }}>
          <PrescriptionForm
            activePatient={activePatient}
            nextAppointment={nextAppointment}
            prescription={prescription}
            onPrescription={handlePrescription}
            onDivider={handleInsertDivider}
          ></PrescriptionForm>
          <DrugList
            drugs={drugs}
            presentations={presentations}
            activeDrug={activeDrug}
            activePresentation={activePresentation}
            onDrugSelection={handleDrugSelection}
            onPresentationSelection={handlePresentationSelection}
            onInsertDrug={handleInsertDrug}
            onMedicalRecordSection={handleMedicalRecordSection}
          ></DrugList>
        </Stack>
      </Stack>
    </Box>
  )
}

PrescriptionForm.propTypes = {
  activePatient: PropTypes.object,
  nextAppointment: PropTypes.string,
  prescription: PropTypes.string,
  onPrescription: PropTypes.func,
  onDivider: PropTypes.func
}

function PrescriptionForm({
  activePatient,
  nextAppointment,
  prescription,
  onPrescription,
  onDivider
}) {
  const componentRef = useRef(null)
  const [rows, setRows] = useState(1)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newHeight = entries[0].contentRect.height
        const LINE_HEIGHT = 23
        const newRows = Math.floor(newHeight / LINE_HEIGHT - 2)
        setRows(newRows)
      }
    })

    if (componentRef.current) {
      // Comienza a observar el componente
      resizeObserver.observe(componentRef.current)
    }

    // Limpia el observador cuando el componente se desmonte
    return () => {
      if (componentRef.current) {
        resizeObserver.unobserve(componentRef.current)
      }
    }
  }, [])

  return (
    <Stack direction="column" spacing="0.875rem" sx={{ flexGrow: 1, height: 1 }}>
      <Stack direction="column" spacing="0.625rem" sx={{ width: 1 }}>
        <Typography variant="h3">Identificación</Typography>
        <Stack direction="row" spacing="0.625rem" sx={{ width: 1 }}>
          <TextField
            sx={{ flexGrow: 1 }}
            label="Nombre"
            size="small"
            value={activePatient.name}
            readOnly
          />
          <DateField
            sx={{ width: '10rem' }}
            label="Fecha"
            slots={{ textField: SmallTextField }}
            value={dayjs()}
            readOnly
          />
          <TextField
            sx={{ width: '10rem' }}
            label="Próxima cita"
            size="small"
            value={nextAppointment?.date ?? 'Sin registro'}
          />
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1, width: 1, maxHeight: 'calc(100vh - 20.375rem)' }} ref={componentRef}>
        <TextField
          sx={{ width: 1, height: 1 }}
          label="Receta"
          rows={rows}
          value={prescription}
          onChange={onPrescription}
          multiline
        />
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'end', width: 1 }}>
        <DataField label="Personal médico responsable">Alejo</DataField>
        <Button variant="outlined" onClick={onDivider}>
          Insertar Separador
        </Button>
      </Stack>
    </Stack>
  )
}

DrugList.propTypes = {
  drugs: PropTypes.array,
  presentations: PropTypes.array,
  activeDrug: PropTypes.object,
  activePresentation: PropTypes.object,
  onDrugSelection: PropTypes.func,
  onPresentationSelection: PropTypes.func,
  onInsertDrug: PropTypes.func,
  onMedicalRecordSection: PropTypes.func
}

function DrugList({
  drugs,
  presentations,
  activeDrug,
  activePresentation,
  onDrugSelection,
  onPresentationSelection,
  onInsertDrug,
  onMedicalRecordSection
}) {
  return (
    <Stack
      direction="column"
      spacing="1.25rem"
      sx={{ alignItems: 'center', width: '20rem', height: 1 }}
    >
      <SearchableDocumentList
        title="Fármacos"
        documents={drugs}
        activeDocument={activeDrug}
        handleDocSelection={onDrugSelection}
        noDocumentCount
        noPadding
      />
      <Stack direction="column" spacing="0.625rem" sx={{ flexGrow: 1, width: 1 }}>
        <Typography variant="h3">Presentaciones</Typography>
        <DocumentList
          documents={presentations}
          activeDocument={activePresentation}
          handleDocSelection={onPresentationSelection}
        />
      </Stack>
      <Button sx={{ width: 'fit-content' }} variant="contained" onClick={onInsertDrug}>
        Insertar medicamento
      </Button>
      <Button
        sx={{ justifyContent: 'start' }}
        startIcon={<ArrowBackOutlinedIcon />}
        variant="text"
        onClick={onMedicalRecordSection}
      >
        Volver al historial clínico
      </Button>
    </Stack>
  )
}
