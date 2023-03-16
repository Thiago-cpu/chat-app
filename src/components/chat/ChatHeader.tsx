import React from "react";
import { useChatStore } from "../../store/ChatStore";

export default function ChatHeader() {
  const chat = useChatStore((state) => state.chat);

  if (!chat) return null;
  return (
    <div className="absolute top-0 right-0 left-0 flex h-16 w-full items-center bg-neutral-800 py-4 pr-5 pl-16 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
      <p>{chat?.name}</p>
    </div>
  );
}
