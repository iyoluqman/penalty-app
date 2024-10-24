"use client";

import { ClientOnly } from "@/components/common/clientOnly";
import { ToastError } from "@/components/common/toastError";
import Input from "@/components/form/input";
import { Select } from "@/components/form/selects";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  label?: string;
  name?: string;
  onChange?: (v?: RefCodesDTO) => void;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  required?: boolean;
  optionAll?: boolean;
  resettable?: boolean;
  apiEndpoint: string;
  title?: string;
  consoleLog?: boolean;
  enabled?: boolean;
};

export function SuperRefCodesDropdown({
  label,
  name,
  onChange,
  value,
  disabled,
  defaultValue,
  required,
  optionAll,
  resettable,
  apiEndpoint: dataUrl,
  title,
  consoleLog,
  enabled = true,
}: Props) {
  const { data, isLoading } = api.common.getDropdownData.useQuery(
    {
      endpoint: dataUrl,
    },
    {
      enabled: enabled,
    }
  );
  const titleText = title ?? label;
  useEffect(() => {
    if (data) {
      if (!Array.isArray(data)) {
        toast.error(<ToastError data={data} />);
      }
    }
  }, [data]);
  if (consoleLog) {
    console.log(data);
  }
  let options: {
    label: string;
    value: string;
  }[] = [];
  // check if data is an array
  if (Array.isArray(data)) {
    options =
      data?.map((d) => ({
        label: d.description,
        value: d.value,
      })) ?? [];
  }

  if (isLoading) {
    return (
      <div className="relative flex flex-col items-center">
        <div className="w-full">
          <Input label={label} disabled />
        </div>
        <LoaderIcon
          className={cn(
            "absolute size-5 animate-spin text-gray-400",
            label ? "top-5" : "top-2"
          )}
        />
      </div>
    );
  }
  return (
    <ClientOnly>
      <Select
        title={titleText}
        required={required}
        disabled={disabled}
        options={[
          ...(optionAll ? [{ label: "All", value: "All" }] : []),
          ...options,
        ]}
        label={label}
        name={name}
        onChange={(opt) => {
          // if (data) {
          //   onChange?.(data?.find((o) => o.value === opt));
          // }
          if (optionAll && opt === "All") {
            onChange?.({
              description: "All",
              value: "All",
            });
            return;
          }
          if (data && Array.isArray(data)) {
            onChange?.(data.find((o) => o.value === opt));
          }
        }}
        // loading={isLoading}
        resettable={resettable}
        value={value}
        defaultValue={defaultValue}
      />
    </ClientOnly>
  );
}
