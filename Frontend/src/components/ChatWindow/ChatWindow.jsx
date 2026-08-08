import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatStore } from "@/store/ChatStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const ChatWindow = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentChatId, setCurrentChat, triggerRefresh } = ChatStore();

  useEffect(() => {
    const loadMessages = async () => {
      if (!currentChatId) {
        setMessages([]);
        return;
      }

      const token = localStorage.getItem("legalmitra_token");
      if (!token) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/conversations/${currentChatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        const formatted = data.flatMap((item) => [
          { id: `${item.id}-q`, role: "user", content: item.question },
          { id: `${item.id}-a`, role: "assistant", content: item.answer },
        ]);

        setMessages(formatted);
      } catch (err) {
        console.error("Failed to load conversation:", err);
      }
    };

    loadMessages();
  }, [currentChatId]);

  const handleSend = async (question) => {
    const token = localStorage.getItem("legalmitra_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const newUserMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question,
          conversation_id: currentChatId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to get a response");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.answer,
        },
      ]);

      if (!currentChatId) {
        setCurrentChat(data.conversation_id);
      }

      triggerRefresh();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content: err.message || "Something went wrong while chatting.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-[#1C1C1C] text-white">
      <ChatHeader onMenuClick={onMenuClick} />
      <ChatMessages messages={messages} isLoading={isLoading} onSuggestionClick={handleSend} />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </main>
  );
};

export default ChatWindow;