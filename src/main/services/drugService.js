import { Drug, SCHEMA_FIELDS } from '../models/Drug'
import { cleanData, parseErrors, serialize } from '../utils/form'

export async function newDrug(event, formData) {
  try {
    const drugData = cleanData(formData, SCHEMA_FIELDS)
    const newDrug = await Drug.create(drugData)
    return { outcome: 'success', payload: toFormData(newDrug) }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function getDrugs() {
  const drugs = await Drug.find({}).select('_id tradeName').sort('tradeName')
  return serialize(drugs.map((drug) => ({ _id: drug._id, label: drug.tradeName })))
}

export async function getDrugById(event, id) {
  const drug = await Drug.findById(id)
  return toFormData(drug)
}

export async function updateDrug(event, id, formData) {
  try {
    const drugData = cleanData(formData, SCHEMA_FIELDS)
    const targetDrug = await Drug.findById(id)
    for (const field in drugData) {
      targetDrug[field] = drugData[field]
    }
    await targetDrug.save()
    return { outcome: 'success', payload: {} }
  } catch (err) {
    return { outcome: 'failure', payload: parseErrors(err.errors) }
  }
}

export async function deleteDrug(event, id) {
  await Drug.findByIdAndDelete(id)
}

export function toFormData(drug) {
  const drugData = serialize(drug)
  drugData.presentations = drugData.presentations.join('\n')
  return drugData
}
