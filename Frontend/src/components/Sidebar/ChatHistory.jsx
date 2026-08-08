import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { ChatStore } from "@/store/ChatStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const ChatHistory = () => {
  const { currentChatId, setCurrentChat, startNewChat, refreshTrigger } = ChatStore();

  const [showRecent, setShowRecent] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    const token = localStorage.getItem("legalmitra_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setConversations(data);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [refreshTrigger]);

  const handleDelete = async (e, conversation) => {
    e.stopPropagation();

    const token = localStorage.getItem("legalmitra_token");

    try {
      const response = await fetch(
        `${API_BASE_URL}/conversations/${conversation.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      if (currentChatId === conversation.id) {
        startNewChat();
      }

      fetchConversations();
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  return (
    <div className="flex flex-col mt-6 px-3">

      {/* New Chat Button */}
      <Button
        onClick={startNewChat}
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
       <div className="mt-2 flex flex-col gap-1 max-h-64 overflow-y-auto pr-1 recents-scroll">  
          {loading && (
            <p className="px-2 py-2 text-xs text-neutral-500">Loading...</p>
          )}

          {!loading && conversations.length === 0 && (
            <p className="px-2 py-2 text-xs text-neutral-500">No conversations yet</p>
          )}

          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center gap-2 rounded-md px-2 py-2 text-sm transition cursor-pointer ${
                currentChatId === conversation.id
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              }`}
              onClick={() => setCurrentChat(conversation.id)}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate flex-1">{conversation.title}</span>

              <button
                type="button"
                onClick={(e) => handleDelete(e, conversation)}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-400 transition-opacity shrink-0"
                aria-label="Delete chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;