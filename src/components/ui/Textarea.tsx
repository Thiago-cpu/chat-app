import { type ForwardedRef, forwardRef, useId } from "react";
import type { IconType, IconBaseProps } from "react-icons";
import { twMerge } from "tailwind-merge";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  leftIcon?: IconType;
  iconProps?: IconBaseProps;
  error?: string;
}

const Textarea = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const {
      leftIcon: LeftIcon,
      className,
      error,
      iconProps = {},
      ...rest
    } = props;
    const labelId = useId();
    const pl = LeftIcon ? "pl-10" : "";
    const { className: iconClassName } = iconProps;
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={labelId}
          className="relative block text-base tracking-tight text-gray-400"
        >
          {LeftIcon && (
            <LeftIcon
              {...iconProps}
              className={twMerge(
                "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform",
                iconClassName
              )}
              size={20}
            />
          )}
          <textarea
            {...rest}
            ref={ref}
            id={labelId}
            className={twMerge(
              `block w-full appearance-none rounded-lg bg-neutral-800 py-3 px-4 text-white placeholder-gray-400 ${pl} placeholder:text-neutral-500 focus:outline-none`,
              className
            )}
          />
        </label>
        <p className="h-5 overflow-hidden text-sm text-red-50">{error}</p>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
