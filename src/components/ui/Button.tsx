import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ForwardedRef,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
}

const Button = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, label, className, ...rest } = props;

    return (
      <button
        ref={ref}
        {...rest}
        className={twMerge(
          "w-full rounded-lg bg-blue-600 py-2 text-center text-base font-semibold text-white hover:bg-blue disabled:bg-neutral-500",
          className
        )}
      >
        {label ?? children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
