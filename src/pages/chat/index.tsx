import { Sidebar } from "../../components/chat/Sidebar";
import React from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen w-screen bg-neutral-800 text-lg font-bold leading-6 text-neutral-200">
      <Sidebar />
    </main>
  );
}
