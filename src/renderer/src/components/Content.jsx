import SideView from './SideView'
import MainView from './MainView'

export default function Content() {
  return (
    <div className="flex w-screen flex-grow flex-row gap-5 px-5 pb-5">
      <SideView></SideView>
      <MainView></MainView>
    </div>
  )
}
