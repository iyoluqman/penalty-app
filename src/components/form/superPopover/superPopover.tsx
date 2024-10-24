"use client";

import Input from "@/components/form/input";
import { SuperRefCodesDropdown } from "@/components/form/superDropdown/superRefCodesDropdown";
import { SuperTableClient } from "@/components/tanstackTable/SuperTableClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { type Row } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

export type Props<T> = {
  required?: boolean;
  consoleLog?: boolean;
  value?: string;
  labelValue: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  title?: string;
  inputFields: {
    inputType?: string;
    inputTitle?: string;
    label: string;
    name: string;
    type?: string;
    dropdownApiEndpoint?: string;
    title?: string;
    value?: string;
    onChange?: (
      targetColumnLabelKey: string,
      targetColumnValueKey: string
    ) => void;
  }[];
  apiEndpoint: string;
  pageApiEndpoint?: string;
  defaultSize?: number;
  columns?: {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    cell?: ({ row }: { row: Row<T> }) => React.ReactNode;
  }[];
  targetColumnLabelKey?: string;
} & (OnChangeProps | OnChangeAllValuesProps<T>);

type OnChangeProps = {
  targetColumnLabelKey: string;
  targetColumnValueKey?: string;
  onChange?: (
    targetColumnLabelKey: string,
    targetColumnValueKey: string
  ) => void;
};
type OnChangeAllValuesProps<T> = {
  // targetColumnLabelKey: undefined;
  onChangeAllValues: (data: T) => void;
};

export function SuperPopover<T>(props: Props<T>) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // accumulator is an object that starts as an empty object ({}) and is being built up by adding properties (inputFields.name) to it.
  // current is the current element in the inputFields array being processed by the reduce function. Current refers to each individual object in the inputFields array.
  const initialSearchState = props.inputFields.reduce(
    (accumulator: Record<string, string>, current) => {
      accumulator[current.name] = "";
      return accumulator;
    },
    {}
  );
  const [search, setSearch] = useState({ ...initialSearchState });
  const [preSearch, setPreSearch] = useState({ ...initialSearchState });

  return (
    <div className="">
      <div className="flex flex-row items-end gap-2">
        <div className="w-full">
          <Input
            name={props.name}
            label={props.label}
            required={props.required}
            readOnly
            value={props.labelValue ?? ""}
          />
          <Input
            className="hidden"
            name={props.name}
            required={props.required}
            readOnly
            value={props.value ?? ""}
          />
        </div>
        <Popover modal={false}>
          <PopoverTrigger asChild ref={closeRef}>
            <button
              disabled={props.disabled}
              type="button"
              className="button h-[30px] !px-2"
              title={props.title}
            >
              <MagnifyingGlassIcon className="size-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] sm:w-[800px]">
            <div>
              <div className="mb-4 flex w-full flex-row justify-between">
                <p className="font-semibold">{props.title}</p>
                <button
                  className="button px-2"
                  type="button"
                  onClick={() => {
                    setPreSearch({
                      ...initialSearchState,
                    });
                    setSearch({
                      ...initialSearchState,
                    });
                  }}
                >
                  <RefreshCw className="size-5" />
                </button>
              </div>
              <div className="mb-2 grid items-end gap-4 sm:grid-cols-2">
                {props.inputFields.map((field) => {
                  switch (field.inputType) {
                    case "dropdown":
                      return (
                        <SuperRefCodesDropdown
                          apiEndpoint={field.dropdownApiEndpoint ?? ""}
                          key={`superPopover${field.name}`}
                          label={field.label}
                          name={field.name}
                          title={field.inputTitle}
                          onChange={(v) => {
                            setPreSearch((prevValue) => ({
                              ...prevValue,
                              [field.name]: v?.value ?? "",
                            }));
                          }}
                          value={
                            preSearch[field.name as keyof typeof preSearch] ??
                            ""
                          }
                        />
                      );
                    default:
                      const inputTitleText = field.inputTitle ?? field.label;

                      return (
                        <Input
                          key={`superPopover${field.name}`}
                          title={inputTitleText}
                          label={field.label}
                          name={field.name}
                          type={field.type}
                          onChange={(e) => {
                            setPreSearch((st) => ({
                              ...st,
                              [field.name]: e.target.value,
                            }));
                          }}
                          value={
                            preSearch[field.name as keyof typeof preSearch] ??
                            ""
                          }
                        />
                      );
                  }
                  // if (field.inputType === "dropdown") {
                  //   return (
                  //     <SuperRefCodesDropdown
                  //       apiEndpoint={field.dropdownApiEndpoint ?? ""}
                  //       key={`superPopover${field.name}`}
                  //       label={field.label}
                  //       name={field.name}
                  //       onChange={(v) => {
                  //         setPreSearch((prevValue) => ({
                  //           ...prevValue,
                  //           [field.name]: v?.value ?? "",
                  //         }));
                  //       }}
                  //       value={preSearch[field.name as keyof typeof preSearch] ?? ""}
                  //     />
                  //   );
                  // }
                  // return (
                  //   <Input
                  //     key={`superPopover${field.name}`}
                  //     label={field.label}
                  //     name={field.name}
                  //     type={field.type}
                  //     onChange={(e) => {
                  //       setPreSearch((st) => ({
                  //         ...st,
                  //         [field.name]: e.target.value,
                  //       }));
                  //     }}
                  //     value={preSearch[field.name as keyof typeof preSearch] ?? ""}
                  //   />
                  // );
                })}
                <div
                  className={cn(
                    `${props.inputFields.length % 2 === 0 ? "sm:col-span-2" : "sm:col-span-1"}`,
                    "flex justify-end"
                  )}
                >
                  <div className="">
                    <button
                      type="button"
                      onClick={() => {
                        setSearch((st) => ({
                          ...st,
                          ...preSearch,
                        }));
                      }}
                      className="button flex items-center bg-blue-600 !px-2 text-white active:bg-blue-800"
                    >
                      <MagnifyingGlassIcon className="mr-2 size-5" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <SuperTableClient<T>
                consoleLog={props.consoleLog}
                searchParams={search}
                isStateful
                apiEndpoint={props.apiEndpoint}
                pageApiEndpoint={props.pageApiEndpoint}
                onRowClick={(u) => {
                  if ("onChange" in props) {
                    props.onChange?.(
                      u[props.targetColumnLabelKey as keyof typeof u] as string,
                      u[props.targetColumnValueKey as keyof typeof u] as string
                    );
                    closeRef.current?.click();
                    return;
                  }
                  (props as OnChangeAllValuesProps<T>).onChangeAllValues(u);
                  closeRef.current?.click();
                }}
                defaultSize={props.defaultSize}
                columns={props.columns}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
