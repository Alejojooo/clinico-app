import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const calculateAge = (value) => {
  if (!value || !value.isValid()) return ''

  const duration = dayjs.duration(dayjs().diff(value))
  if (value.isAfter(dayjs())) return '0a'
  // De 0 a 1 año se cuentan los meses y días
  if (duration.years() >= 13) return `${duration.years()}a`
  // De 1 a 12 años se cuentan los años y meses
  else if (duration.years() >= 1) return `${duration.years()}a ${duration.months()}m`
  // A partir de los 13 años se dejan de contar los meses
  else return `${duration.months()}m ${duration.days()}d`
}
