import NavigationSection from './NavigationSection'
import RecordList from './RecordList'
import RecordListTitle from './RecordListTitle'
import SearchBar from './SearchBar'

export default function SideView() {
  return (
    <nav className="w-1/3 flex flex-col mt-2.5 justify-start items-center gap-3.5">
      <NavigationSection></NavigationSection>
      <RecordListTitle title="Listado de pacientes"></RecordListTitle>
      <SearchBar></SearchBar>
      <RecordList></RecordList>
    </nav>
  )
}
