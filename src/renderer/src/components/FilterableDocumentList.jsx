import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'

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
  const [searchValue, setSearchValue] = useState('')
  const [filteredDocuments, setFilteredDocuments] = useState(documents)

  useEffect(() => {
    setFilteredDocuments(documents)
  }, [documents])

  const handleInput = (e) => {
    // Si no hay documentos para filtrar
    if (!(documents?.length > 0)) return

    const newValue = e.target.value.trim()
    if (newValue === '') {
      setFilteredDocuments(documents)
    } else {
      const newFilteredDocuments = documents.filter((doc) => doc.label.includes(newValue))
      setFilteredDocuments(newFilteredDocuments)
    }
    setSearchValue(newValue)
  }

  return (
    <div className="flex w-full grow flex-col items-center justify-start gap-3.5">
      <SearchBar
        title={title}
        length={filteredDocuments.length}
        value={searchValue}
        onInput={handleInput}
      ></SearchBar>
      <DocumentList>
        {filteredDocuments?.length > 0 &&
          filteredDocuments.map((doc) => (
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
