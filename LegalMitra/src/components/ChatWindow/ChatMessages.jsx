import { useEffect, useRef } from "react";
import {
  Loader2,
  ShieldCheck,
  Briefcase,
  House,
  FileText,
} from "lucide-react";
import MessageBubble from "./MessageBubble";

const suggestions = [
  {
    icon: ShieldCheck,
    title: "Consumer Rights",
    description: "Refunds & defective products",
  },
  {
    icon: Briefcase,
    title: "Employment Law",
    description: "Salary, resignation & workplace rights",
  },
  {
    icon: House,
    title: "Property Law",
    description: "Rent, ownership & disputes",
  },
  {
    icon: FileText,
    title: "Police & FIR",
    description: "Complaints, FIR & legal procedures",
  },
];

function ChatMessages({ messages, isLoading, onSuggestionClick }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-evenly px-4">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-neutral-400 mb-2">
          How can I help you today ?
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-7 w-full max-w-xl mx-auto">
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                role="button"
                tabIndex={0}
                onClick={() => onSuggestionClick?.(item.title)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSuggestionClick?.(item.title);
                  }
                }}
                className="group h-32 cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col justify-between transition-all duration-300 hover:border-zinc-500 hover:bg-neutral-800 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center group-hover:bg-violet-500/10">
                  <Icon size={20} className="text-neutral-300" />
                </div>

                <h3 className="mt-2 text-white text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-neutral-400 text-xs leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-neutral-400 ml-10">
          <Loader2 size={16} className="animate-spin" />
          Analyzing legal information...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;