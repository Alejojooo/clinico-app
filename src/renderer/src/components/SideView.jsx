import PropTypes from 'prop-types'

export default function SideView({ children }) {
  return (
    <aside className="mt-2.5 flex w-[30%] flex-col items-center justify-start gap-3.5">
      {children}
    </aside>
  )
}

SideView.propTypes = {
  children: PropTypes.node
}
