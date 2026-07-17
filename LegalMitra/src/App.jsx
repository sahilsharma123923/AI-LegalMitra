import './App.css'
import ChatWindow from './components/ChatWindow/ChatWindow'
import SideBar from './components/Sidebar/SideBar'

function App() {


  return (
    <div className='flex '>
      <SideBar/>
      <ChatWindow/>
    </div>
  )
}

export default App
