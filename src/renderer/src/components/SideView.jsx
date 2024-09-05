import NavigationSection from './NavigationSection'
import RecordList from './RecordList'
import RecordListTitle from './RecordListTitle'
import SearchBar from './SearchBar'
import Record from './Record'

export default function SideView() {
  return (
    <aside className="mt-2.5 flex w-[30%] flex-col items-center justify-start gap-3.5">
      <NavigationSection></NavigationSection>
      <RecordListTitle title="Listado de pacientes" length={10}></RecordListTitle>
      <SearchBar></SearchBar>
      <RecordList>
        <Record name="Alejojooo"></Record>
      </RecordList>
    </aside>
  )
}
