import React ,{useEffect}from 'react'
import SideBar from '@/components/Sidebar/SideBar'
import ChatWindow from '@/components/ChatWindow/ChatWindow'

const Home = () => {
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

export default Home
