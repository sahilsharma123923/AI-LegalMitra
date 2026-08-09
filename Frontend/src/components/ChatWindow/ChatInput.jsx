import React, { useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

const ChatInput = ({ onSend, isLoading = false }) => {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    onSend?.(trimmed);
    setQuestion("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="flex justify-center px-4 py-3 md:px-6">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-[#2A2A2A] transition-all duration-200 focus-within:border-neutral-400">
        <div className="flex items-center gap-2 px-3 py-2 md:px-4">
          <textarea
            ref={textareaRef}
            rows={1}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask any legal question"
            className="flex-1 resize-none bg-transparent overflow-hidden text-white placeholder:text-zinc-400 outline-none text-sm leading-5"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !question.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 transition-colors duration-200 focus-within:border-neutral-800 disabled:opacity-50"
          >
            <SendHorizonal size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;