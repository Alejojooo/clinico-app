import dayjs from 'dayjs'

const PRETTY_FORMAT = 'DD/MM/YYYY HH:mm'
const TIME_FORMAT = 'HH:mm'

export function toUIDate(date) {
  return date
}

export function formatDate(date, opts) {
  const datetime = dayjs(date)
  if (!datetime.isValid()) return ''
  if (opts?.pretty) return datetime.format(PRETTY_FORMAT)
  else if (opts?.onlyTime) return datetime.format(TIME_FORMAT)
  else return datetime.format()
}

export function isValidDate(date) {
  return dayjs(date).isValid()
}
