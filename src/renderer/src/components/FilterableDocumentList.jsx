import styled from '@emotion/styled'
import { List, ListItemButton, ListItemText } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'

const FilteredList = styled(List)(({ theme }) => ({
  width: '100%',
  padding: 0,
  backgroundColor: theme.palette['antiflash-white'].main,
  borderRadius: 15,
  overflow: 'clip',
  height: '100%',
  '& .MuiButtonBase-root': {
    height: '2rem',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16
  },
  '& .MuiButtonBase-root.Mui-selected': {
    backgroundColor: theme.palette['columbia-blue'].main
  }
}))

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
      <FilteredList>
        {filteredDocuments?.length > 0 &&
          filteredDocuments.map((doc) => (
            <ListItemButton
              key={doc._id}
              onClick={() => handleDocSelection(doc._id)}
              selected={activeDocument?._id === doc._id}
            >
              <ListItemText primary={doc.label}></ListItemText>
            </ListItemButton>
          ))}
      </FilteredList>
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
