import React, { useDeferredValue, useId, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Textfield from "@/components/ui/Textfield";
import { initials } from "@/utils/string";
import AddChannel from "./AddChannel";
import { useSidebarStore } from "@/store/SidebarStore";
import { api } from "@/utils/api";
import useObserver from "@/hooks/useObserver";
import { useChatStore } from "@/store/ChatStore";
import { type Chat } from "@prisma/client";
import useMergedItems from "../../../hooks/useMergedItems";

export default function AllChannel() {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);

  return (
    <div className="relative flex flex-1 flex-col overflow-auto">
      <div className="absolute flex h-16 w-full items-center justify-between bg-black-600 py-3 pr-5 pl-8 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
        <p>Channels</p>
        <AddChannel />
      </div>
      <div className="mt-16 flex flex-1 flex-col overflow-auto bg-black-600 py-5 pl-8 pr-6">
        <Textfield
          leftIcon={AiOutlineSearch}
          iconProps={{
            className: "fill-white",
          }}
          placeholder="Search"
          className="bg-gray-100"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <ChannelButtons q={deferredQ} />
      </div>
    </div>
  );
}

function ChannelButtons({ q }: { q?: string }) {
  const chanelButtonId = useId();
  const changeChat = useChatStore((state) => state.changeChat);
  const toggle = useSidebarStore((state) => state.toggle);
  const { data: chatPage, fetchNextPage } =
    api.chat.infiniteList.useInfiniteQuery(
      {
        limit: 50,
        q,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  const channels = useMergedItems(chatPage);
  const { ref: observedRef } = useObserver({
    onObserved: () => void fetchNextPage(),
  });

  const handleChangeChat = (chat: Chat) => () => {
    changeChat(chat);
    toggle();
  };

  return (
    <div className="scrollbar flex flex-col gap-5 overflow-y-auto">
      {channels.map((chat, i) => {
        const name = chat.name;
        return (
          <button
            key={`${name}-${i}-${chanelButtonId}`}
            className="flex items-center gap-3 rounded-lg hover:bg-[#25232938]"
            onClick={handleChangeChat(chat)}
            ref={i === channels.length - 10 ? observedRef : undefined}
          >
            <div className=" flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 font-semibold uppercase">
              {initials(name).slice(0, 2)}
            </div>
            <p className="flex-1 text-left">{name}</p>
          </button>
        );
      })}
    </div>
  );
}
