"use client";

import {
  SSelect,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { RefreshCwIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { VList } from "virtua";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  label?: string;
  name?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  resettable?: boolean;
  onChange?: (v: string) => void;
  title?: string;
};

export function Select({
  options,
  label,
  name,
  className,
  placeholder,
  required,
  defaultValue,
  disabled,
  value,
  onChange,
  resettable,
  title,
}: Props) {
  const [select, setSelect] = useState(defaultValue ?? "");
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (value === "") {
      setSelect("");
      return;
    }
    if (value !== select) {
      setSelect(value ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(() => {
    if (defaultValue) {
      setSelect(defaultValue);
    }
  }, [defaultValue]);

  const selection = options.find(
    (opt) => opt.value.toString() === select.toString()
  );
  const [r, setR] = useState(0);

  return (
    <Suspense key={`selectReset${r}`}>
      <div>
        {label && (
          <label className="flex text-sm leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300">
            {label} {required && <span className="text-red-600">&nbsp;*</span>}
          </label>
        )}
        <input
          className="peer absolute inset-0 -z-20 opacity-0"
          required={required}
          value={value}
          readOnly
        />
        <SSelect
          name={name}
          disabled={disabled}
          required={required}
          defaultValue={defaultValue}
          // juggling check
          value={value != null ? value.toString() : selection?.value.toString()}
          onValueChange={(v) => {
            setSelect(v);
            onChange?.(v);
          }}
        >
          <div
            className={cn(
              "relative flex h-[30px] flex-row items-center rounded border border-gray-300 leading-none shadow-none",
              className,
              disabled && "border-slate-400 bg-slate-200"
              // "peer-required:border-red-600",
            )}
          >
            <SelectTrigger
              className="line-clamp-1 w-full flex-1 text-ellipsis disabled:border-slate-400 disabled:bg-slate-200"
              asChild
            >
              <button
                type="button"
                className="flex flex-1 flex-row justify-between py-1.5"
                title={title}
              >
                <span className="pointer-events-none line-clamp-1 text-left">
                  <SelectValue placeholder={placeholder} />
                </span>

                <CaretSortIcon className="h-4 w-4 opacity-50" />
              </button>
            </SelectTrigger>
            {/* <input
              className="absolute peer inset-0 opacity-0 -z-20"
              required={required}
              value={value}
              readOnly
            /> */}
            {resettable && (
              <button
                type="button"
                onClick={() => {
                  setR(r + 1);
                  setSelect("");
                }}
                className="px-2"
              >
                <RefreshCwIcon className="h-4 w-4 text-gray-600 duration-500 hover:rotate-[180deg]" />
              </button>
            )}
          </div>
          <SelectContent>
            {options.length > 50 && !!selection && (
              <>
                <SelectItem value={selection.value.toString()}>
                  {selection.label}
                </SelectItem>
                <SelectSeparator />
              </>
            )}
            {options.length > 50 ? (
              <VList className="min-h-[200px]">
                {options
                  .filter((opt) => opt.value.toString() !== select.toString())
                  .map((opt, idx) => (
                    <SelectItem
                      key={`slt${idx}${opt.value}`}
                      value={opt.value?.toString()}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
              </VList>
            ) : (
              <>
                {options.map((opt, idx) => (
                  <SelectItem
                    key={`slt${idx}${opt.value}`}
                    value={opt.value?.toString()}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </SSelect>
      </div>
    </Suspense>
  );
}
