import React from 'react'
import SidebarHeader from './SidebarHeader'
import { MessageSquare, FileText } from 'lucide-react'
import NavItem from './NavItem'
import SidebarFooter from './SidebarFooter'

const SideBar = () => {
  return (
    <aside className='w-60 h-screen bg-[#1C1C1C] text-white flex flex-col'>
      <SidebarHeader />

      <nav className='flex flex-col gap-1 px-3 mt-4'>
        <NavItem to='/chats' icon={MessageSquare} label='Chats' />
        <NavItem to='/documents' icon={FileText} label='Documents' />
      </nav>

      <div className='mt-auto px-3 py-4 '>
       <SidebarFooter/>
      </div>
    </aside>
  )
}

export default SideBar