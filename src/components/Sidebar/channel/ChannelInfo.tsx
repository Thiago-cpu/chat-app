import React, { useId } from "react";
import { initials } from "@/utils/string";

import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSidebarStore } from "@/store/SidebarStore";
import { useChatStore } from "@/store/ChatStore";
import { api } from "@/utils/api";
import useObserver from "@/hooks/useObserver";

export default function ChannelInfo() {
  const seeAllChats = useSidebarStore((state) => state.toggle);
  const chat = useChatStore((state) => state.chat);
  if (!chat) return null;

  return (
    <div className="relative flex flex-1 flex-col overflow-auto">
      <div className="absolute flex h-16 w-full items-center gap-5 bg-black-600 py-4 pr-5 pl-5 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
        <IconButton
          iconProps={{
            size: 32,
            className: "fill-neutral-100 outline-none",
          }}
          onClick={seeAllChats}
          icon={MdKeyboardArrowLeft}
        />
        <p>All Channels</p>
      </div>
      <div className="mt-16 flex flex-1 flex-col overflow-auto bg-black-600 py-5 pl-8 pr-6">
        <h1>{chat.name}</h1>
        <p className="mt-4 font-normal">{chat.description}</p>
        <ChannelMembers />
      </div>
    </div>
  );
}

function ChannelMembers() {
  const userinfokey = useId();
  const { data: userPage, fetchNextPage } =
    api.user.infiniteList.useInfiniteQuery(
      {
        limit: 50,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  const observedRef = useObserver({
    onObserved: () => void fetchNextPage(),
  });

  const usersPage = userPage?.pages.reduce((acum, curr) => {
    if (acum.items) {
      return {
        ...acum,
        items: [...acum.items, ...curr.items],
      };
    }
    return curr;
  });
  const users = usersPage?.items ?? [];

  return (
    <div className="mt-11 flex flex-col gap-6 overflow-auto">
      <h1>MEMBERS</h1>
      <div className="scrollbar flex flex-col gap-8 overflow-auto">
        {users.map(({ name, image, email }, i) => {
          const label = name ?? email ?? "";
          const src = image ?? "";
          return (
            <div
              key={`${label}-${i}-${userinfokey}`}
              className="flex items-center gap-7"
              ref={i === users.length - 10 ? observedRef : undefined}
            >
              <Avatar
                className="h-10 w-10"
                alt={label}
                src={src}
                fallback={initials(label).slice(0, 2)}
              />
              <p className="">{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
