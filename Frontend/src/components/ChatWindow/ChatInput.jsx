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
    <div className="flex justify-center px-4 py-5 md:px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-700 bg-[#2A2A2A] transition-all duration-200 focus-within:border-neutral-400">
        <div className="flex items-end gap-3 px-4 py-3 md:px-5">
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
            className="flex-1 resize-none bg-transparent overflow-hidden text-white placeholder:text-zinc-400 outline-none leading-6"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !question.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl bg-zinc-800 transition-colors duration-200 focus-within:border-neutral-800 disabled:opacity-50"
          >
            <SendHorizonal size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
