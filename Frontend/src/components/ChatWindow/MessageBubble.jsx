import { Scale } from 'lucide-react';

function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
          <Scale size={13} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? 'bg-zinc-800 text-white'
            : 'bg-neutral-800 text-neutral-200'
        }`}
      >
        {content}
      </div>

    </div>
  );
}

export default MessageBubble;