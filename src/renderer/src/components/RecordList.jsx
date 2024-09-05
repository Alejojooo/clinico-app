import PropTypes from 'prop-types'

export default function RecordList({ children }) {
  return (
    <div className="flex w-full flex-grow flex-col overflow-clip rounded-2xl bg-secondary-light">
      {children}
    </div>
  )
}

RecordList.propTypes = {
  children: PropTypes.node
}
