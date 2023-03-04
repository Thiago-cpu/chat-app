import { create } from "zustand";

interface SidebarState {
  seeAllChats: boolean;
  toggle: () => void;
}

const defaultSidebarState: Pick<SidebarState, "seeAllChats"> = {
  seeAllChats: true,
};

export const useSidebarStore = create<SidebarState>()((set) => ({
  ...defaultSidebarState,
  toggle: () => set((state) => ({ seeAllChats: !state.seeAllChats })),
}));
