import PropTypes from 'prop-types'

export default function MainView({ children }) {
  return <main className="flex-grow rounded-2xl bg-white">{children}</main>
}

MainView.propTypes = {
  children: PropTypes.node
}
