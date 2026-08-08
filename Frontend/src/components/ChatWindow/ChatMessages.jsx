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
  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col">
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-evenly px-4 py-6">
          <h1 className="text-2xl font-semibold text-neutral-400 mb-4 text-center">
            How can I help you today ?
          </h1>

          <div className="grid grid-cols-1 gap-4 w-full max-w-xl mx-auto sm:grid-cols-2">
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
                  className="group h-28 cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900 p-3 flex flex-col justify-between transition-all duration-300 hover:border-zinc-500 hover:bg-neutral-800 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-violet-500/10">
                    <Icon size={16} className="text-neutral-300" />
                  </div>

                  <h3 className="mt-1 text-white text-base font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-neutral-400 text-xs leading-5">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-neutral-400 ml-10">
              <Loader2 size={16} className="animate-spin" />
              Analyzing legal information...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatMessages;