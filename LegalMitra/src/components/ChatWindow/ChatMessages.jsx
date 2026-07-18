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

function ChatMessages({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

 if (messages.length === 0 && !isLoading) {
  return (
    <div className="flex-1 flex flex-col items-center justify-evenly px-5">

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-neutral-300 mb-3">
        How can I help you today ?
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-2xl mx-auto">
        {suggestions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group h-30 cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col justify-between transition-all duration-300 hover:border-violet-500 hover:bg-neutral-800 hover:-translate-y-1">
              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center group-hover:bg-violet-500/10">
                  <Icon
                    size={20}
                    className="text-violet-400"
                  />
                </div>

              </div>

              <h3 className="mt-2 text-white text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-neutral-400 text-sm leading-6">
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
        <MessageBubble
          key={msg.id}
          role={msg.role}
          content={msg.content}
        />
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