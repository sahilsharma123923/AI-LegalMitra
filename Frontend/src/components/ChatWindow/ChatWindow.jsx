import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const ChatWindow = ({ onMenuClick }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (question) => {
    const newUserMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("legalmitra_token");

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question }),
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