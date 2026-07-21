import React from 'react'
import SidebarHeader from './SidebarHeader'
import { FileText, MessageSquare } from 'lucide-react'
import NavItem from './NavItem'
import SidebarFooter from './SidebarFooter'
import ChatHistory from './ChatHistory'
import { useLocation } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation();
  const isDocumentPage=location.pathname===("/documents")

  return (
    <aside className='w-60 h-screen bg-[#1C1C1C] text-white border-r border-neutral-800 flex flex-col'>
      
      <SidebarHeader />

      <nav className="flex flex-col gap-1 px-3 mt-4">

        {isDocumentPage && (
          <NavItem
            to="/"
            icon={MessageSquare}
            label="Chat"
          />
        )}

        <NavItem
          to="/documents"
          icon={FileText}
          label="Documents"
        />

      </nav>

     {!isDocumentPage && <ChatHistory />}

      <div className='mt-auto px-2 pb-1'>
        <SidebarFooter />
      </div>
    </aside>
  )
}

export default SideBar