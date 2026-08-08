import { create } from "zustand";

export const ChatStore = create((set) => ({
  currentChatId: null,
  refreshTrigger: 0,

  setCurrentChat: (chatId) =>
    set({ currentChatId: chatId }),

  startNewChat: () =>
    set({ currentChatId: null }),

  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));