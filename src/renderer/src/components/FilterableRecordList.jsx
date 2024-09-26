import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

DocumentListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

function DocumentListItem({ name, isActive, onClick }) {
  return (
    <button
      className={`flex h-7 w-full flex-row items-center justify-start px-4 hover:bg-secondary focus:bg-tertiary ${isActive ? 'bg-tertiary' : ''}`}
      onClick={onClick}
    >
      {name}
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
    <div className="flex grow flex-col items-center justify-start gap-3.5">
      <SearchBar title={title} length={documents.length}></SearchBar>
      <DocumentList>
        {documents?.length > 0 &&
          documents.map((patient) => (
            <DocumentListItem
              key={patient._id}
              name={patient.name}
              isActive={activeDocument?._id === patient._id}
              onClick={() => handleDocSelection(patient._id)}
            ></DocumentListItem>
          ))}
      </DocumentList>
    </div>
  )
}
