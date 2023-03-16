import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

export default function ChatSection() {
  return (
    <section className="relative flex flex-1 flex-col bg-neutral-800">
      <ChatHeader />
      <ChatBody />
    </section>
  );
}
