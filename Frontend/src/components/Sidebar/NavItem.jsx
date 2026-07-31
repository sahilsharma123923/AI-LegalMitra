import React from 'react'
import {NavLink} from 'react-router-dom'

const NavItem = ({to,icon:Icon,label}) => {
  return (
  <NavLink
    to={to}
    className={({isActive})=>
    ` relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${isActive
       ? 'bg-indigo-500/15 text-indigo-400 font-medium':'text-gray-300 hover:bg-white/5 hover:text-white'}`
    }>
        <Icon size={18}/>
       <span>{label}</span>     
  </NavLink>
  )
}

export default NavItem
