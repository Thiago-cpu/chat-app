import React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  fallbackClassName?: string;
}

export default function Avatar({
  fallback,
  alt,
  src,
  className,
  fallbackClassName,
}: Props) {
  return (
    <RadixAvatar.Root className={twMerge("h-10 w-10 rounded-lg", className)}>
      <RadixAvatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
        loading="lazy"
      />
      <RadixAvatar.Fallback className="">
        <div
          className={twMerge(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 font-semibold uppercase",
            fallbackClassName
          )}
        >
          {fallback}
        </div>
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
