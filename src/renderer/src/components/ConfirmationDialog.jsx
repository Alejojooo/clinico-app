import PropTypes from 'prop-types'

export default function ConfirmationDialog({ title, message, onSelection }) {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-row items-center justify-center bg-accent bg-opacity-50">
      <div className="flex flex-col items-end justify-start rounded-3xl bg-secondary-light p-6 opacity-100">
        <div className="flex flex-col items-start justify-start gap-4">
          <span className="text-2xl">{title}</span>
          <span className="text-sm">{message}</span>
        </div>
        <div className="flex h-16 flex-row items-end justify-center gap-5">
          <button
            className="h-10 w-20 font-semibold"
            onClick={() => {
              onSelection(false)
            }}
          >
            Cancelar
          </button>
          <button
            className="h-10 w-20 font-semibold"
            onClick={() => {
              onSelection(true)
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSelection: PropTypes.func
}
