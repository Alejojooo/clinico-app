import { DateTime } from 'luxon'

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm"
const ISO_FORMAT_PRETTY = 'yyyy-MM-dd HH:mm'

export function ISOToJSDate(date) {
  const datetime = DateTime.fromISO(date)
  if (datetime.isValid) return datetime.toJSDate()
  return null
}

export function JSDateToISO(date, opts) {
  const datetime = DateTime.fromJSDate(date)
  if (datetime.isValid) {
    if (opts?.includeTime) {
      if (opts?.pretty) return datetime.toFormat(ISO_FORMAT_PRETTY)
      else return datetime.toFormat(ISO_FORMAT)
    } else {
      return datetime.toISODate()
    }
  }
  return ''
}
