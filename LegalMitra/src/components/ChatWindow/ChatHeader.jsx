import React from 'react'
import { Button } from "@/components/ui/button"
import { LogIn,UserPlus } from 'lucide-react'

const ChatHeader = () => {
  return (
    <div className="flex justify-end items-center px-3 py-3 gap-3">
      <Button 
        variant="outline" 
        className="transition-transform duration-200 hover:scale-105 active:scale-95 border-violet-500 dark:border-violet-500"
      >
        <UserPlus className='text-violet-500'/>
        Signup
      </Button>
      <Button 
        variant="outline" 
        className="transition-transform duration-200 hover:scale-105 active:scale-95 border-violet-500 dark:border-violet-500"
      >
        <LogIn className='text-violet-500'/>
        Login
      </Button>
    </div>
  )
}

export default ChatHeader