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
  const { chats } = ChatStore();

  const [showRecent, setShowRecent] = useState(true);

  return (
    <div className="flex flex-col mt-6 px-3">

      {/* New Chat Button */}
      <Button className=" p-2 w-40  flex items-center justify-center bg-neutral-300 hover:bg-neutral-600 text-zinc-900 hover:text-white  gap-2 rounded-lg">
        <Plus className="w-4 h-4" />
        New Chat
      </Button>

      {/* Recent Button */}
      <Button
        variant="ghost"
        onClick={() => setShowRecent(!showRecent)}
        className="mt-3 w-40 justify-between px-2 text-neutral-200 hover:bg-neutral-800"
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
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
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