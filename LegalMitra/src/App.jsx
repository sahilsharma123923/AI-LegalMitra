import { useEffect } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow/ChatWindow'
import SideBar from './components/Sidebar/SideBar'

function App() {

useEffect(() => {
  document.documentElement.classList.add("dark")
}, [])
  return (
    <div className='flex '>
      <SideBar/>
      <ChatWindow/>
    </div>
  )
}

export default App
