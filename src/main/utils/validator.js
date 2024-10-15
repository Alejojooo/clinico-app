import { Query } from 'mongoose'

export async function validateUnique(thiz, model, field, value) {
  // Si no se encuentra una entidad con el mismo nombre, retornar true
  const entity = await model.findOne({ [field]: value }).select(`_id ${field}`)
  if (!entity) return true

  if (thiz instanceof Query) {
    // `this` hace referencia al Query
    return entity._id.toString() === thiz.getQuery()._id.toString()
  } else {
    // `this` hace referencia al documento actual
    return entity._id.toString() === thiz._id.toString()
  }
}
