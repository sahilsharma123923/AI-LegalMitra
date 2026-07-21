import React from 'react'
import { FileText,Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

const DocumentItem = ({documents,onDelete}) => {
  return (
    <div className='flex items-center justify-between bg-[#1c1c1c] border border-neutral-800 rounded-lg px-4 py-3'>
      <div className='flex items-center gap-3 overflow-hidden'>
     <FileText size={18} className='text-neutral-500 shrink-0'/>
     <span className='truncate text-sm text-neutral-200'>{documents.fileName}</span>
     <StatusBadge status={document.status}/>

     <button onClick={()=>onDelete?.(document.id)}
        className='text-neutral-500 hover:text-red-300 transition-colors'><Trash2 size={16}/></button>
      </div>
    </div>
  )
}

export default DocumentItem
