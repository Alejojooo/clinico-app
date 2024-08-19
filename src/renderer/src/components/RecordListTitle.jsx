import PropTypes from 'prop-types'

export default function RecordListTitle({ title }) {
  return (
    <div className="w-full h-8 flex flex-row px-5 justify-between items-end">
      <h3 className="text-base font-semibold h-fit">{title}</h3>
      <span className="text-base font-semibold h-fit">12 {/* TODO: Ponerlo dinámico */}</span>
    </div>
  )
}

RecordListTitle.propTypes = {
  title: PropTypes.string
}
