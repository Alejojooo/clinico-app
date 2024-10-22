import { List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import useSearch from '../hooks/useSearch'
import SearchBar from './SearchBar'

SearchableDocumentList.propTypes = {
  title: PropTypes.string,
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func,
  noDocumentCount: PropTypes.bool,
  noPadding: PropTypes.bool
}

export default function SearchableDocumentList({
  title,
  documents,
  activeDocument,
  handleDocSelection,
  noDocumentCount,
  noPadding
}) {
  const { searchValue, filteredDocuments, handleInput } = useSearch(documents)

  return (
    <Stack
      direction="column"
      spacing="0.875rem"
      sx={{
        flexGrow: 1,
        width: 1,
        justifyContent: 'start',
        alignItems: 'center'
      }}
    >
      <SearchBar
        title={title}
        length={filteredDocuments.length}
        value={searchValue}
        onInput={handleInput}
        noDocumentCount={noDocumentCount}
        noPadding={noPadding}
      />
      <DocumentList
        documents={filteredDocuments}
        activeDocument={activeDocument}
        handleDocSelection={handleDocSelection}
      />
    </Stack>
  )
}

DocumentList.propTypes = {
  documents: PropTypes.array,
  activeDocument: PropTypes.object,
  handleDocSelection: PropTypes.func
}

export function DocumentList({ documents, activeDocument, handleDocSelection }) {
  return (
    <List
      sx={{
        width: 1,
        height: 1,
        padding: 0,
        backgroundColor: 'surface.main',
        borderRadius: '0.25rem',
        overflow: 'hidden',
        '& .MuiListItem-root': {},
        '& .MuiButtonBase-root': {
          display: 'block',
          height: '2rem',
          padding: '0 1rem'
        },
        '& .MuiButtonBase-root.Mui-selected': {
          backgroundColor: 'secondary.main'
        },
        '& .MuiListItemText-root': {
          width: 1
        },
        '& .MuiTypography-root': {
          width: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }}
    >
      {documents?.length > 0 &&
        documents.map((doc) => (
          <ListItem key={doc._id} disablePadding>
            <ListItemButton
              onClick={() => handleDocSelection(doc._id)}
              selected={activeDocument?._id === doc._id}
            >
              <ListItemText primary={doc.label}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  )
}
