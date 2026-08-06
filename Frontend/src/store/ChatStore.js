import { create } from "zustand";

export const ChatStore = create((set) => ({
  chats: [
    {
      id: 1,
      title: "Consume Rights",
    },
    {
      id: 2,
      title: "Property Dispute",
    },
    {
      id: 3,
      title: "Employment Law",
    },
    {
      id: 4,
      title: "Police & FIR",
    },
  ],

  currentChat: {
    id: 1,
    title: "Consume Rights",
  },

  addChat: () =>
    set((state) => {
      const newChat = {
        id: Date.now(),
        title: "New Chat",
      };

      return {
        chats: [newChat, ...state.chats],
        currentChat: newChat,
      };
    }),

  setCurrentChat: (chatId) =>
    set((state) => {
      const chat = state.chats.find((item) => item.id === chatId);
      return chat ? { currentChat: chat } : {};
    }),

  deleteChat: (chatId) =>
    set((state) => {
      const chats = state.chats.filter((chat) => chat.id !== chatId);
      const currentChat = state.currentChat?.id === chatId ? chats[0] ?? null : state.currentChat;
      return { chats, currentChat };
    }),

  renameChat: (chatId, title) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, title } : chat
      ),
      currentChat:
        state.currentChat?.id === chatId
          ? { ...state.currentChat, title }
          : state.currentChat,
    })),
}));