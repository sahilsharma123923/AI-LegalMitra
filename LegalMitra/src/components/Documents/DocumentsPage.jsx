import React, { useState } from 'react'
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';

const DocumentsPage = () => {
   const[documents,setDocuments]=useState([]);

   const handleFilesSelected=(files)=>{
    const newDocs=files.map((file)=>({
       id:crypto.randomUUID(),
       fileName:file.name,
       status:'processing',
    }))
    setDocuments((prev)=>[...newDocs,...prev])

    // simulate backend processing - remove this once real upload API is wired

    newDocs.forEach((doc) => {
      setTimeout(()=>{
        setDocuments((prev)=>
        prev.map((d)=>(d.id===doc.id ? {...d,status:'index'}:d)))

      },1800)
    });
   }
   const handleDelete=(id)=>{
    setDocuments((prev)=>prev.filter((d)=>d.id !==id))
   }
  return (
    <div className='flex-1 h-screen overflow-y-auto bg-[#141414] text-white p-8'>
     <div className='max-w-3xl mx-auto'>

      <h1 className='text-2xl font-semibold mb-1'>Documents</h1>
    <p className='text-neutral-400 text-sm mb-6'>Upload leagal documents to let legal Mitra answer questions form you.</p>
      <DocumentUpload onFilesSelected={handleFilesSelected}/>
    
      <div>
        <DocumentList documents={documents}/>
      </div>
     </div>
    </div>
  )
}

export default DocumentsPage
