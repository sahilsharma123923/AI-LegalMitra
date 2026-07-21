import { UploadCloud } from 'lucide-react';
import React, { useRef, useState } from 'react'

const DocumentUpload = ({onFilesSelected}) => {
    const [dragActive,setDragActive]=useState(true);
    const inputRef=useRef(null);

    const handleDrop=(e)=>{
        e.preventDefault()
        setDragActive(false)
        const files=Array.from(e.dataTransfer.files)
        if(files.length) {
            return onFilesSelected(files)
        }
    }
    const handleBrowse=(e)=>{
        const files=Array.from(e.target.files)
        if(files.length) onFilesSelected(files)
            e.target.value=''
    }
  return (
    <div
    onDragOver={(e)=>{e.preventDefault(); setDragActive(true)}}
    onDragLeave={()=>setDragActive(false)}
    onDrop={handleDrop}
    onClick={()=>inputRef.current?.click()}
    className={`border border-dashed rounded-lg text-center p-10 cursor-pointer transition-colors ${dragActive ?'border-indigo-500 bg-indigo-500/10':'border-neutral-800 hover:border-neutral-700'}`}
      >
        <UploadCloud className='mx-auto mb-3 text-neutral-300' size={32}/>
        <p className='text-neutral-300 font-medium'>Drag & drop files here</p>
        <p className='text-neutral-500 text-sm mt-1'>or cick to browse (PDF, DOCX ,TXT)</p>
        <input
        ref={inputRef}
         type="file"
         accept='.pdf,.docx,.txt'
         multiple
         className='hidden'
         onChange={handleBrowse}            
         />
    </div>
  )
}

export default DocumentUpload
