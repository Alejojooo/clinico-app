import SideView from './SideView'
import MainView from './MainView'

export default function Content() {
  return (
    <main className="w-screen flex flex-row flex-grow px-5 pb-5 gap-5">
      <SideView></SideView>
      <MainView></MainView>
    </main>
  )
}
