import { DateTime } from 'luxon'

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm"
const PRETTY_FORMAT = 'dd/MM/yyyy HH:mm'

export function ISOToJSDate(date) {
  const datetime = DateTime.fromISO(date)
  if (datetime.isValid) return datetime.toJSDate()
  return null
}

export function DateToISO(date, opts) {
  if (!date) return ''
  const ISODateString = date.toISOString()
  return formatISO(ISODateString.slice(0, ISODateString.indexOf('T')), opts)
}

export function DatetimeToISO(date, opts) {
  if (!date) return ''
  return formatISO(date.toISOString(), opts)
}

function formatISO(date, opts) {
  const datetime = DateTime.fromISO(date)
  if (!datetime.isValid) return ''
  if (opts?.includeTime) {
    if (opts?.pretty) return datetime.toFormat(PRETTY_FORMAT)
    else return datetime.toFormat(ISO_FORMAT)
  } else {
    return datetime.toISODate()
  }
}
