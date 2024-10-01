import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

DocumentListItem.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

function DocumentListItem({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`flex h-7 w-full flex-row items-center justify-start px-4 hover:bg-secondary focus:bg-tertiary ${isActive ? 'bg-tertiary' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

DocumentList.propTypes = {
  children: PropTypes.node
}

function DocumentList({ children }) {
  return (
    <div className="flex w-full flex-grow flex-col overflow-clip rounded-2xl bg-secondary-light">
      {children}
    </div>
  )
}

FilterableDocumentList.propTypes = {
  title: PropTypes.string,
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func
}

export default function FilterableDocumentList({
  title,
  documents,
  activeDocument,
  handleDocSelection
}) {
  return (
    <div className="flex w-full grow flex-col items-center justify-start gap-3.5">
      <SearchBar title={title} length={documents.length}></SearchBar>
      <DocumentList>
        {documents?.length > 0 &&
          documents.map((doc) => (
            <DocumentListItem
              key={doc._id}
              label={doc.label}
              isActive={activeDocument?._id === doc._id}
              onClick={() => handleDocSelection(doc._id)}
            ></DocumentListItem>
          ))}
      </DocumentList>
    </div>
  )
}
