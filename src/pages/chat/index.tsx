import ChatSection from "@/components/chat/ChatSection";
import { Sidebar } from "@/components/Sidebar";
import React from "react";

export default function Page() {
  return (
    <main className="flex max-h-screen min-h-screen w-screen bg-neutral-800 text-lg font-bold leading-6 text-neutral-200">
      <Sidebar />
      <ChatSection />
    </main>
  );
}
