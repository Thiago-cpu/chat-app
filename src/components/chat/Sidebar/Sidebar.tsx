import AllChannel from "./channel/AllChannel";
import ChannelInfo from "./channel/ChannelInfo";
import ProfileMenu from "./profile/ProfileMenu";
import { useSidebarStore } from "../../../store/SidebarStore";

export default function Sidebar() {
  const seeAllChats = useSidebarStore((state) => state.seeAllChats);
  return (
    <aside className="flex w-80 select-none flex-col">
      {seeAllChats ? <AllChannel /> : <ChannelInfo />}
      <ProfileMenu />
    </aside>
  );
}
