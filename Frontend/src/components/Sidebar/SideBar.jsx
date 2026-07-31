import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'
import ChatHistory from './ChatHistory'

const SideBar = () => {
  
  return (
    <aside className='w-60 h-screen bg-[#1C1C1C] text-white border-r border-neutral-800 flex flex-col'>
      
      <SidebarHeader />

      <ChatHistory />

      <div className='mt-auto px-2 pb-1'>
        <SidebarFooter />
      </div>
    </aside>
  )
}

export default SideBar