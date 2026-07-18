import React from 'react'
import { Scale } from 'lucide-react'

const SidebarHeader = () => {
  return (
    <div className='px-3 py-3  border-b border-neutral-800'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30'>
          <Scale size={18} className='text-indigo-300' />
        </div>
        <div>
          <h1 className='text-white font-semibold text-2xl leading-tight tracking-tight pt-2'>
            Legal Mitra
          </h1>
          <p className='text-sm text-gray-400 '>
            AI Legal Assistant
          </p>
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader