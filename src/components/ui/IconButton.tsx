import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { IconType, IconBaseProps } from "react-icons";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconType;
  iconProps?: IconBaseProps;
}

export default function IconButton(props: Props) {
  const { icon: Icon, iconProps = {}, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={twMerge("flex items-center justify-center", className)}
    >
      <Icon size={18} className="fill-neutral-500" {...iconProps} />
    </button>
  );
}
