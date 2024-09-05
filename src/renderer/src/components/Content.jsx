import PropTypes from 'prop-types'

export default function Content({ children }) {
  return <div className="flex w-screen flex-grow flex-row gap-5 px-5 pb-5">{children}</div>
}

Content.propTypes = {
  children: PropTypes.node
}
