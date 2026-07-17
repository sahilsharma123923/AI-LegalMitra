import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessges from './ChatMessges'
import ChatInput from './ChatInput'

const ChatWindow = () => {
  return (
    <main className='flex-1 h-screen bg-[#1C1C1C] flex flex-col text-white'>
      <ChatHeader/>
      <ChatMessges/>
      <ChatInput/>
    </main>
  )
}

export default ChatWindow
