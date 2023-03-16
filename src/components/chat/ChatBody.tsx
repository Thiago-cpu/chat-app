import React, { Fragment, LegacyRef, useId } from "react";
import { useChatStore } from "../../store/ChatStore";
import Textfield from "../ui/Textfield";
import { IoIosSend } from "react-icons/io";
import IconButton from "../ui/IconButton";
import { api } from "@/utils/api";
import useMergedItems from "@/hooks/useMergedItems";
import Avatar from "../ui/Avatar";
import { initials } from "../../utils/string";
import { MessageDate, MessagesSectionDate } from "@/utils/date";
import useObserver from "@/hooks/useObserver";
import { useRef, useEffect } from "react";

export default function ChatBody() {
  const chat = useChatStore((state) => state.chat);
  if (!chat) return null;
  return (
    <div className="mt-16 flex flex-1 flex-col justify-end gap-12 overflow-auto px-16 pt-5 pb-10">
      <Messages chatId={chat.id} />
      <Textfield
        placeholder="Type a message here"
        withoutErrorMessage
        className="bg-gray-100 py-4 pr-14"
        rightElement={
          <IconButton
            icon={IoIosSend}
            iconProps={{ className: "fill-white" }}
            className="h-10 w-10 rounded-lg bg-blue"
          />
        }
      />
    </div>
  );
}

function Messages({ chatId }: { chatId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const key = useId();
  const { data, fetchNextPage } = api.message.infiniteList.useInfiniteQuery(
    {
      limit: 50,
      chatId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const messages = useMergedItems(data);
  const { ref: observedRef } = useObserver({
    onObserved: () => {
      void fetchNextPage();
    },
  });
  // holy shit
  // useEffect(() => {
  //   if (scrollRef.current) {
  //     const newScrollTop =
  //       scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  //     console.log("hi", newScrollTop);
  //     scrollRef.current.scrollTop = newScrollTop;
  //   }
  // }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="chat-scrollbar flex flex-col-reverse gap-9 overflow-auto pr-4"
    >
      {messages.map((msg, i) => {
        const prevMsg = messages[i - 1];
        const isAnotherDay =
          !!prevMsg && prevMsg.createdAt.getDate() !== msg.createdAt.getDate();
        const label = msg.user.name ?? msg.user.email ?? "";
        const src = msg.user.image ?? "";
        const shouldObserve = i === messages.length - 10;
        return (
          <Fragment key={`${key}-${msg.id}`}>
            <div
              ref={shouldObserve ? observedRef : undefined}
              className="flex gap-7"
            >
              <Avatar
                className="h-10 w-10"
                alt={label}
                src={src}
                fallback={initials(label).slice(0, 2)}
              />
              <div className="flex flex-1 flex-col gap-3 text-lg font-medium leading-6 text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{label}</span>
                  <time
                    className="self-end text-sm"
                    dateTime={msg.createdAt.toISOString()}
                  >
                    {MessageDate(msg.createdAt)}
                  </time>
                </div>
                <span className="text-base font-extralight text-neutral-200">
                  {msg.body}
                </span>
              </div>
            </div>
            {isAnotherDay ? <SeparatorDate date={prevMsg.createdAt} /> : null}
          </Fragment>
        );
      })}
    </div>
  );
}

function SeparatorDate({ date }: { date: Date }) {
  return (
    <div className="flex gap-5">
      <div className="flex-1 self-center border border-neutral-500" />
      <span className="text-xs font-semibold text-neutral-500">
        {MessagesSectionDate(date)}
      </span>
      <div className="flex-1 self-center border border-neutral-500" />
    </div>
  );
}
