import { DateTime } from 'luxon'

export function localeFormatToJSDate(date) {
  const dateTime = DateTime.fromFormat(date, 'D', { locale: 'es-GT' })
  if (dateTime.isValid) return dateTime.toJSDate()
  return null
}

export function JSDateToLocaleFormat(date) {
  const dateTime = DateTime.fromJSDate(date)
  if (dateTime.isValid) return dateTime.toFormat('D', { locale: 'es-GT' })
  return ''
}
