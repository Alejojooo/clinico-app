import PropTypes from 'prop-types'

export default function RecordListTitle({ title, length }) {
  return (
    <div className="flex h-8 w-full flex-row items-end justify-between px-5">
      <h3 className="h-fit text-base font-semibold">{title}</h3>
      <span className="h-fit text-base font-semibold">{length}</span>
    </div>
  )
}

RecordListTitle.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
}
