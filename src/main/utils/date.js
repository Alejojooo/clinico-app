import dayjs from 'dayjs'

const FORMAT = 'DD/MM/YYYY HH:mm'

export function toUIDate(date) {
  return date
}

export function formatDate(date, opts) {
  const datetime = dayjs(date)
  if (!datetime.isValid()) return ''
  if (opts?.pretty) return datetime.format(FORMAT)
  else return datetime.format()
}

export function isValidDate(date) {
  return dayjs(date).isValid()
}
