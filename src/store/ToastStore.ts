import { create } from "zustand";

interface PrimitiveToastState {
  type: "warning" | "info";
  duration: number;
  title: string;
  description: string;
}

interface ToastState extends PrimitiveToastState {
  toastRef?: NodeJS.Timeout;
  open: boolean;
  notify: (props: Partial<PrimitiveToastState>) => void;
  onOpenChange: (open: boolean) => void;
}

const defaultToastState: Omit<ToastState, "notify" | "onOpenChange"> = {
  type: "info",
  open: false,
  duration: 3000,
  title: "",
  description: "",
};

export const useToastStore = create<ToastState>()((set, get) => ({
  ...defaultToastState,
  notify: (props) => {
    const duration = props.duration ?? get().duration;
    const title = props.title ?? "";
    const description = props.description ?? "";
    const type = props.type ?? "info";

    if (get().open) {
      clearTimeout(get().toastRef);
      set(() => ({ open: false }));
    }

    setTimeout(() => {
      const toastRef = setTimeout(() => {
        set(() => ({ open: false }));
      }, duration);

      set(() => ({ open: true, title, description, type, toastRef }));
    }, 100);
  },

  onOpenChange: (open) => {
    set(() => ({
      open,
    }));
  },
}));
