import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'



const ChatWindow = () => {
  const [messages, setMessages] = useState("")
  const [isLoading, setIsLoading] = useState()

  return (
    <main className='flex-1 h-screen bg-[#1C1C1C] flex flex-col text-white'>
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput />
    </main>
  )
}

export default ChatWindow