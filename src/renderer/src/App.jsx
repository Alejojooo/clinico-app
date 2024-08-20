import TopAppBar from './components/TopAppBar'
import Content from './components/Content'

function App() {
  return (
    <div className="bg-primary text-accent w-screen h-screen flex flex-col">
      <TopAppBar></TopAppBar>
      <Content></Content>
    </div>
  )
}

export default App
