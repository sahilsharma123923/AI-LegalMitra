import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { ChatStore } from "@/store/ChatStore";

const ChatHistory = () => {
  const { chats, currentChat, addChat, setCurrentChat } = ChatStore();

  const [showRecent, setShowRecent] = useState(true);

  return (
    <div className="flex flex-col mt-6 px-3">

      {/* New Chat Button */}
      <Button
        onClick={addChat}
        className="p-2 w-40 flex items-center justify-center text-neutral-200 bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-800 gap-2 rounded-xl"
      >
        <Plus className="w-4 h-4" />
        New Chat
      </Button>

      {/* Recent Button */}
      <Button
        variant="ghost"
        onClick={() => setShowRecent(!showRecent)}
        className="mt-4 w-44 justify-between px-2 text-neutral-200 hover:bg-neutral-800"
      >
        <span className="text-sm font-medium">Recents</span>

        {showRecent ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </Button>

      {/* Chat History */}
      {showRecent && (
        <div className="mt-2 flex flex-col gap-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setCurrentChat(chat.id)}
              className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ${
                currentChat?.id === chat.id
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;