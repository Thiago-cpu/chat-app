import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { IconType } from "react-icons";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconType;
}

export default function IconButton(props: Props) {
  const { icon: Icon, ...rest } = props;
  return (
    <button
      {...rest}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-500"
    >
      <Icon width={18} height={18} className="fill-neutral-500" />
    </button>
  );
}
