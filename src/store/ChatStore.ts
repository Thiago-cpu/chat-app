import { type Chat } from "@prisma/client";
import { create } from "zustand";

interface ChatState {
  chat?: Chat;
  changeChat: (chat: Chat) => void;
}

const defaultChatState: Pick<ChatState, "chat"> = {
  chat: undefined,
};

export const useChatStore = create<ChatState>()((set) => ({
  ...defaultChatState,
  changeChat: (chat) => set(() => ({ chat })),
}));
