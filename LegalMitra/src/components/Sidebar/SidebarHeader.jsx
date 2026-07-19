import React from 'react'
import { Scale } from 'lucide-react'

const SidebarHeader = () => {
  return (
    <div className='px-3 py-3  border-b border-neutral-800'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-9 h-9 rounded-xl  border border-violet-500'>
          <Scale size={20} className='text-indigo-300' />
        </div>
        <div>
          <h1 className='text-neutral-300 font-medium text-3xl leading-tight tracking-tight pt-2'>
            Legal Mitra
          </h1>
          <p className='text-xs text-gray-400 pt-1'>
            AI Legal Assistant
          </p>
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader