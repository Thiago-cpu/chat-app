import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  forwardRef,
  type ForwardedRef,
} from "react";
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

const IconButton = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { icon: Icon, iconProps = {}, className, ...rest } = props;
    return (
      <button
        {...rest}
        ref={ref}
        className={twMerge("flex items-center justify-center", className)}
      >
        <Icon size={18} className="fill-neutral-500" {...iconProps} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
