import React, { useId } from "react";
import { initials } from "../../../../utils/string";

import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSidebarStore } from "@/store/SidebarStore";

export default function ChannelInfo() {
  const seeAllChats = useSidebarStore((state) => state.toggle);

  const channelInfo = {
    name: "FRONT-END DEVELOPERS",
    description:
      "Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non",
  };

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="absolute flex h-16 w-full gap-5 bg-black-600 py-4 pr-5 pl-5 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
        <IconButton
          iconProps={{
            size: 32,
            className: "fill-neutral-100 outline-none",
          }}
          onClick={seeAllChats}
          icon={MdKeyboardArrowLeft}
        />
        <p className="self-center">All Channels</p>
      </div>
      <div className="mt-16 flex flex-1 flex-col bg-black-600 py-5 pl-8 pr-6">
        <h1>{channelInfo.name}</h1>
        <p className="mt-4 font-normal">{channelInfo.description}</p>
        <ChannelMembers />
      </div>
    </div>
  );
}

function ChannelMembers() {
  const userinfokey = useId();

  const channelMembers = [
    { name: "Xanthe Neal", image: "someurl", email: "someemail@gmail.com" },
    { name: "Nellie Francis", image: "someurl", email: "someemail@gmail.com" },
    { name: "Denzel Barrett", image: "someurl", email: "someemail@gmail.com" },
    { name: "Shaunna Firth", image: "someurl", email: "someemail@gmail.com" },
    { name: "Annaliese Huynh", image: "someurl", email: "someemail@gmail.com" },
  ];

  return (
    <div className="mt-11 flex flex-col gap-6">
      <h1>MEMBERS</h1>
      <div className="flex flex-col gap-8">
        {channelMembers.map(({ name, image, email }, i) => {
          const label = name ?? email ?? "";
          return (
            <div
              key={`${name}-${i}-${userinfokey}`}
              className="flex items-center gap-7"
            >
              <Avatar
                className="h-10 w-10"
                alt={name}
                src={image}
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
