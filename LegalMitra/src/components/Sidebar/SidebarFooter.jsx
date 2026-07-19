// SidebarFooter.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Settings, LogOut, ChevronUp } from 'lucide-react'

const SidebarFooter = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className='relative mt-auto px-4 py-4 '>
      
      {/* Dropdown menu */}
      {open && (
        <div className='absolute bottom-[68px] left-3 right-3 bg-[#252525] border border-white/10 rounded-lg shadow-lg overflow-hidden'>
          <button className='w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-200 hover:bg-white/5 transition-colors'>
            <Settings size={16} />
            Settings
          </button>
          <button className='w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors'>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}

      {/* Profile row */}
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center justify-center gap-3 p-2 cursor-pointer transition-colors'
      >
        <div className='w-9 h-9 rounded-full bg-zinc-700 hover:bg-zinc-800 border-neutral-900 flex items-center justify-center text-slate-200 font-medium text-sm'>
          SS
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-white truncate'>Sahil Sharma</p>
          <p className='text-xs text-neutral-500 truncate'>sahil@email.com</p>
        </div>

        <ChevronUp
          size={16}
          className={`text-gray-400 transition-transform ${open ? 'rotate-0' : 'rotate-180'}`}
        />
      </div>
    </div>
  )
}

export default SidebarFooter