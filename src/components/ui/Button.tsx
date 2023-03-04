import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
}

export default function Button(props: Props) {
  const { children, label, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={twMerge(
        "w-full rounded-lg bg-blue py-2 text-center text-base font-semibold text-white disabled:bg-neutral-500",
        className
      )}
    >
      {label ?? children}
    </button>
  );
}
