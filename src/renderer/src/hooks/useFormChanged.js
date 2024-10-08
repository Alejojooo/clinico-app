import { useRef } from 'react'

export default function useFormChanged(currentValues) {
  const originalData = useRef(null)

  const setOriginalData = (values) => (originalData.current = values)
  const hasChanged = () => originalData.current !== currentValues

  return { hasChanged: hasChanged(), setOriginalData }
}
