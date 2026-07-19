import React from 'react'
import { Scale } from 'lucide-react'

const SidebarHeader = () => {
  return (
    <div className='px-4 py-3  border-b border-neutral-800'>
      <div className='flex items-center justify-center gap-2'>
        <div className='flex items-center justify-center w-10 h-10 rounded-2xl  border border-zinc-600'>
          <Scale size={24} className='text-indigo-200' />
        </div>
        <div>
          <h1 className='text-neutral-300 font-medium text-3xl leading-tight tracking-tight pt-2'>
            Legal Mitra
          </h1>
          <p className='text-xs text-gray-500 pt-1'>
            AI Legal Assistant
          </p>
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader