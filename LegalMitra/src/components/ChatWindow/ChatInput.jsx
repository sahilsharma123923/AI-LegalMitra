import React from 'react'
import { SendHorizonal } from 'lucide-react'

const ChatInput = () => {
  return (
    <div className='flex justify-center px-6 py-5'>
       <div className=" w-full max-w-2xl rounded-3xl border border-zinc-700 bg-[#2A2A2A] transition-all duration-200 focus-within:border-neutral-400">

          <div className='flex items-center gap-3 px-5 py-3'>
            {/* Textarea */}
            <textarea rows={1}
            placeholder='Ask any legal question'
            className='flex-1 resize-none bg-transparent overflow-hidden text-white placeholder:text-zinc-400 outline-none leading-6' />
            
            <button className='flex h-10  w-10 items-center border  justify-center rounded-3xl bg-zinc-800 transition-colors duration-200  focus-within:border-neutral-800'> <SendHorizonal size={20} className='text-white'/></button>
          </div>
        </div>
      
    </div>
  )
}

export default ChatInput
