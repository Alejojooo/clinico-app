import NavigationSection from './NavigationSection'
import RecordList from './RecordList'
import RecordListTitle from './RecordListTitle'
import SearchBar from './SearchBar'

export default function SideView() {
  return (
    <aside className="mt-2.5 flex w-[30%] flex-col items-center justify-start gap-3.5">
      <NavigationSection></NavigationSection>
      <RecordListTitle title="Listado de pacientes"></RecordListTitle>
      <SearchBar></SearchBar>
      <RecordList></RecordList>
    </aside>
  )
}
