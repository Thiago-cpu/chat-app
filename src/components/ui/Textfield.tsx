import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export default function Textfield(props: Props) {
  const { leftIcon: LeftIcon, className, ...rest } = props;
  const labelId = useId();
  const pl = LeftIcon ? "pl-14" : "";
  return (
    <label
      htmlFor={labelId}
      className="text-gray-400 relative block text-base tracking-tight text-neutral-500"
    >
      {LeftIcon && (
        <LeftIcon className="pointer-events-none absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 transform" />
      )}
      <input
        {...rest}
        id={labelId}
        className={twMerge(
          `placeholder-gray-400 text-gray-500 block w-full appearance-none rounded-lg border border-neutral-400 bg-transparent py-3 px-4 ${pl} placeholder:text-neutral-500 focus:outline-none`,
          className
        )}
      />
    </label>
  );
}
