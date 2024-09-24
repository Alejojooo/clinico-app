import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

Record.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

function Record({ name, isActive, onClick }) {
  return (
    <button
      className={`flex h-7 w-full flex-row items-center justify-start px-4 hover:bg-secondary focus:bg-tertiary ${isActive ? 'bg-tertiary' : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

RecordList.propTypes = {
  children: PropTypes.node
}

function RecordList({ children }) {
  return (
    <div className="flex w-full flex-grow flex-col overflow-clip rounded-2xl bg-secondary-light">
      {children}
    </div>
  )
}

FilterableRecordList.propTypes = {
  title: PropTypes.string,
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func
}

export default function FilterableRecordList({
  title,
  documents,
  activeDocument,
  handleDocSelection
}) {
  return (
    <>
      <SearchBar title={title} length={documents.length}></SearchBar>
      <RecordList>
        {documents?.length > 0 &&
          documents.map((patient) => (
            <Record
              key={patient._id}
              name={patient.name}
              isActive={activeDocument?._id === patient._id}
              onClick={() => handleDocSelection(patient._id)}
            ></Record>
          ))}
      </RecordList>
    </>
  )
}
