import React from 'react'

const styles={
    processing:'bg-yellow-500/10 text-yellow-400',
    indexed:'bg-green-500/10 text-green-400',
    failed:'bg-red-500/10 text-red-400'
}

const labels={
    processing:"Processing",
    indexed:"Indexed",
    failed:"Failed"
}

const StatusBadge = ({status}) => {
  return (
   <span className={`text-xs px-2 py-1 rounded-full ${styles[status]}`}>
    {labels[status]}
   </span>
  )
}

export default StatusBadge
