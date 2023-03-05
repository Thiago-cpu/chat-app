import * as React from "react";
import * as PrimitiveToast from "@radix-ui/react-toast";
import { shallow } from "zustand/shallow";
import { useToastStore } from "../../store/ToastStore";

interface Props {
  children?: React.ReactElement;
}

const ToastProvider = ({ children }: Props) => {
  const { open, onOpenChange, title, description } = useToastStore(
    (state) => ({
      open: state.open,
      onOpenChange: state.onOpenChange,
      title: state.title,
      description: state.description,
    }),
    shallow
  );

  return (
    <PrimitiveToast.Provider swipeDirection="right">
      {children}
      <PrimitiveToast.Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={open}
        onOpenChange={onOpenChange}
      >
        <PrimitiveToast.Title className="text-slate12 mb-[5px] text-[15px] font-medium [grid-area:_title]">
          {title}
        </PrimitiveToast.Title>
        <PrimitiveToast.Description asChild>
          <div className="text-slate11 m-0 text-[13px] leading-[1.3] [grid-area:_description]">
            {description}
          </div>
        </PrimitiveToast.Description>
      </PrimitiveToast.Root>
      <PrimitiveToast.Viewport className="fixed top-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </PrimitiveToast.Provider>
  );
};

export default ToastProvider;
