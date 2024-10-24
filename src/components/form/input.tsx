import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { LoaderIcon } from "lucide-react";

type Props = {
  title?: string;
  label?: string;
  error?: string;
  required?: boolean;
  loading?: boolean;
};

export default function Input(
  props: Props &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
) {
  const { label, error, loading, ...rest } = props;
  const titleText = props.title ?? props.label;

  return (
    <>
      <div className="relative">
        {props.label && (
          <label
            htmlFor={`${props.name}-input`}
            className="flex text-sm leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
          >
            {props.label}
            {props.required && <span className="text-red-600">&nbsp;*</span>}
          </label>
        )}
        {loading ? (
          // <Skeleton className="block h-[30px] w-full" />
          <div className="relative flex flex-col items-center">
            <div className="w-full">
              <Input disabled />
            </div>
            <LoaderIcon
              className={`absolute top-2 size-5 animate-spin text-gray-400`}
              // className={`absolute size-5 animate-spin text-gray-400 ${cn(label ? "top-5" : "top-2")}`}
            />
          </div>
        ) : (
          <input
            {...rest}
            className={cn(
              "block h-[30px] w-full rounded border py-1 pl-2 focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100",
              props.error
                ? "border-red-300 pr-10 text-red-900"
                : "border-gray-300 pr-2 text-gray-900 dark:text-gray-200",
              "disabled:border-slate-400 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none",
              "read-only:border-slate-400 read-only:bg-slate-200",
              props.className
            )}
            // ref={iRef}
            id={`${props.name}-input`}
            title={titleText}
          />
        )}

        {props.error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="size-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {props.error && (
        <p className="mt-2 text-sm text-red-600">{props.error}</p>
      )}
    </>
  );
}
