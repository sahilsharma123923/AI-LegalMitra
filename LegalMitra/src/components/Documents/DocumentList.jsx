import React from 'react'
import DocumentItem from './DocumentItem'

const DocumentList = ({documents}) => {
    if(documents.length===0){
        return (
            <p className='text-neutral-500 text-sm text-center mt-10'>No documents uploaded yet.</p>
        )
    }
  return (
    <div className='flex flex-col gap-2'>
        {documents.map((doc)=>(
            <DocumentItem key={doc.id} document={doc}/>
        ))}
    </div>
  )
}

export default DocumentList
