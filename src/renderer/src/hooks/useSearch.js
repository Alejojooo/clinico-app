import { useEffect, useState } from 'react'

export default function useSearch(documents) {
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

  return {
    searchValue,
    filteredDocuments,
    handleInput
  }
}
