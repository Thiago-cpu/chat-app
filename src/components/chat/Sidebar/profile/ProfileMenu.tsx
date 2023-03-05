import React, { useState } from "react";

import { signOut } from "next-auth/react";
import { initials } from "@/utils/string";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import MyProfile from "./MyProfile";
import { api } from "@/utils/api";

export default function ProfileMenu() {
  const { data: me } = api.user.me.useQuery();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  if (!me) return null;

  const label = me.name ?? me.email ?? "";
  const src = me.image ?? "";
  return (
    <div className="flex gap-7 bg-black-700 pb-4 pt-4 pl-7 pr-7">
      <Avatar
        className="h-10 w-10"
        alt={label}
        src={src}
        fallback={initials(label).slice(0, 2)}
      />
      <div className="flex flex-1 items-center justify-between">
        <p className="text-neutral-400">{label}</p>
        <DropdownMenu.Root open={openMenu} onOpenChange={setOpenMenu}>
          <DropdownMenu.Trigger asChild>
            <IconButton
              iconProps={{
                size: 20,
                className: "fill-neutral-400 outline-none",
              }}
              icon={openMenu ? MdKeyboardArrowUp : MdKeyboardArrowDown}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[192px] select-none rounded-xl border border-gray-100 bg-neutral-800 p-4 pl-3 text-base font-medium text-neutral-200 outline-none will-change-transform-opacity data-[size=top]:animate-slideDownAndFade"
              sideOffset={5}
              side="top"
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenu.Item onSelect={() => setOpenProfile(true)}>
                <div className="flex cursor-pointer items-center gap-3 rounded-lg py-3 pl-3 hover:bg-gray-100 ">
                  <FaUserCircle size={22} />
                  <p>My Profile</p>
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-4 h-[1px] bg-gray-100" />
              <DropdownMenu.Item
                onClick={() => void signOut()}
                className="cursor-pointer rounded-lg py-3 pl-3 text-red-300 hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <IoMdLogOut size={22} className="fill-red-300" />
                  <p>Logout</p>
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <MyProfile open={openProfile} onOpenChange={setOpenProfile} />
    </div>
  );
}
