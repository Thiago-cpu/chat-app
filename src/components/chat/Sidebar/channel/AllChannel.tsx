import React, { useId } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Textfield from "../../../ui/Textfield";
import { initials } from "../../../../utils/string";
import AddChannel from "./AddChannel";
import { useSidebarStore } from "../../../../store/SidebarStore";

export default function AllChannel() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="absolute flex h-16 w-full justify-between bg-black-600 py-3 pr-5 pl-8 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
        <p className="self-center">Channels</p>
        <AddChannel />
      </div>
      <div className="mt-16 flex flex-1 flex-col bg-black-600 py-5 pl-8 pr-6">
        <Textfield
          leftIcon={AiOutlineSearch}
          iconProps={{
            className: "fill-white",
          }}
          placeholder="Search"
          className="bg-gray-100"
          type="search"
        />
        <ChannelButtons />
      </div>
    </div>
  );
}

function ChannelButtons() {
  const chanelButtonId = useId();
  const toggle = useSidebarStore((state) => state.toggle);

  const channelnames = [
    "Front-end developers",
    "random",
    "BACK-END",
    "CATS AND DOGS",
    "Welcome",
  ];

  const handleChangeChat = () => {
    toggle();
  };

  return (
    <div className="flex flex-col gap-5">
      {channelnames.map((name, i) => {
        return (
          <button
            key={`${name}-${i}-${chanelButtonId}`}
            className="flex gap-3 rounded-lg hover:bg-[#25232938]"
            onClick={handleChangeChat}
          >
            <div className=" flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 font-semibold uppercase">
              {initials(name).slice(0, 2)}
            </div>
            <p className="self-center">{name}</p>
          </button>
        );
      })}
    </div>
  );
}
