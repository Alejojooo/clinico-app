import Badge from '@mui/material/Badge'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import PropTypes from 'prop-types'

ServerDay.propTypes = {
  highlightedDays: PropTypes.array,
  day: PropTypes.object,
  outsideCurrentMonth: PropTypes.bool
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

  const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.date())

  return (
    <Badge key={day.toString()} overlap="circular" badgeContent={isSelected ? '🚩' : undefined}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  )
}

Calendar.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  highlightedDays: PropTypes.array
}

export default function Calendar(props) {
  const { value, onChange, onMonthChange, highlightedDays } = props

  // const highlightedDays = [1, 5, 10, 15, 20] // Define aquí los días específicos con badge

  return (
    <DateCalendar
      value={value}
      onChange={onChange}
      onMonthChange={onMonthChange}
      slots={{
        day: ServerDay
      }}
      slotProps={{
        day: {
          highlightedDays // Pasa los días destacados como prop a ServerDay
        }
      }}
    />
  )
}
