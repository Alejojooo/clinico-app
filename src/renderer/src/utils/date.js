import { DateTime, Interval } from 'luxon'

export const calculateAge = (value) => {
  const birthdate = DateTime.fromISO(value)
  if (!birthdate.isValid) return ''

  const duration = Interval.fromDateTimes(birthdate, DateTime.now())
    .toDuration(['years', 'months', 'days'])
    .toObject()

  const birthdateIsAfterToday = Object.keys(duration).length === 0
  if (birthdateIsAfterToday) return '0a'
  // De 0 a 1 año se cuentan los meses y días
  if (duration.years >= 13) return `${duration.years}a`
  // De 1 a 12 años se cuentan los años y meses
  else if (duration.years >= 1) return `${duration.years}a ${duration.months}m`
  // A partir de los 13 años se dejan de contar los meses
  else return `${duration.months}m ${Math.floor(duration.days)}d`
}
