"use client";

import Input from "@/components/form/input";
import { SuperRefCodesDropdown } from "@/components/form/superDropdown/superRefCodesDropdown";
import { SuperPopover } from "@/components/form/superPopover/superPopover";
import { Button } from "@/components/ui/button";
import { appendQueryParams, getFormDataAndQuery } from "@/lib/search";
import { useSearchState } from "@/lib/useSearchState";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RefreshCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const { preSearch, search, setPreSearch, executeSearch, resetSearch } =
    useSearchState({
      receiptNo: "",
      receiveFromUnit: "",
      receiveFromUnitName: "",
      receiveType: "All",
      noteNo: "",
      receiveDateFrom: "",
      receiveDateTo: "",
      createdBy: "",
      createdByName: "",
      status: "Open",
      indentNo: "",
    });

  return (
    <form
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        const { query } = getFormDataAndQuery(e, pathname);
        const q = appendQueryParams(query, search);
        router.push(q.href);
      }}
      className=""
    >
      <div className="py-6">
        <div className="flex w-full flex-col justify-between sm:flex-row">
          <h1 className="text-base font-semibold uppercase leading-6 text-gray-900">
            Receive Intra Facility
          </h1>
          <div className="flex justify-end gap-4">
            <Button
              variant="icon"
              size="icon"
              type="submit"
              onClick={() => {
                resetSearch();
              }}
            >
              <RefreshCw className="size-5" />
            </Button>
            <Button type="button" variant="icon" size="icon">
              <PlusIcon className="size-5" />
            </Button>
            <Button
              variant="search"
              size="iconText"
              type="submit"
              onClick={() => {
                executeSearch();
              }}
            >
              <MagnifyingGlassIcon className="mr-2 size-5" />
              Search
            </Button>
          </div>
        </div>
        <div className="grid gap-4 py-2 sm:grid-cols-2">
          <SuperPopover<ReceiptNoDTO>
            label="Receipt No."
            title="Receipt No."
            labelValue={preSearch.receiptNo ?? ""}
            name="receiptNo"
            columns={[
              {
                header: "Receipt No.",
                accessorKey: "receiptNo",
              },
              {
                header: "Receive Date",
                accessorKey: "receiveDate",
              },
            ]}
            inputFields={[
              {
                label: "Receipt No.",
                name: "receiptNo",
              },
            ]}
            apiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/receipt_no`}
            pageApiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/receipt_no/page`}
            onChangeAllValues={(e) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  receiptNo: e.receiptNo ?? "",
                };
              });
            }}
          />
          <SuperPopover<ReceiveIntraFromUnitDTO>
            label="Receive From Unit"
            title="Receive From Unit"
            labelValue={preSearch.receiveFromUnitName ?? ""}
            name="receiveFromUnit"
            columns={[
              {
                header: "Unit Name",
                accessorKey: "unitName",
              },
              {
                header: "Unit Code",
                accessorKey: "unitCode",
              },
            ]}
            inputFields={[
              {
                label: "Unit Name",
                name: "unitName",
              },
            ]}
            apiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/receive_from_unit_name`}
            pageApiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/receive_from_unit_name/page`}
            onChangeAllValues={(e) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  receiveFromUnitName: e.unitName ?? "",
                  receiveFromUnit: e.unitSeqno ?? "",
                };
              });
            }}
          />
          <SuperRefCodesDropdown
            apiEndpoint="/api/v1/inventory/inventory_management/receive_item/intra_facility/receive_type"
            label="Receive Type"
            name="receiveType"
            value={preSearch.receiveType ?? ""}
            optionAll
            onChange={(v) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  receiveType: v?.value ?? "",
                };
              });
            }}
          />
          <SuperPopover<ReceiveIntraNoteNoDTO>
            label="Note No."
            title="Note No."
            labelValue={preSearch.noteNo ?? ""}
            name="noteNo"
            columns={[
              {
                header: "Note No.",
                accessorKey: "noteNo",
              },
              {
                header: "From Unit",
                accessorKey: "fromUnit",
              },
              {
                header: "Note Date",
                accessorKey: "noteDate",
              },
            ]}
            inputFields={[
              {
                label: "Note No.",
                name: "noteNo",
              },
            ]}
            apiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/note_no`}
            pageApiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/note_no/page`}
            onChangeAllValues={(e) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  noteNo: e.noteNo ?? "",
                };
              });
            }}
          />
          <Input label="Receive Date From" name="receiveDateFrom" type="date" />
          <Input label="Receive Date To" name="receiveDateTo" type="date" />
          <SuperPopover<ReceiveIntraCreatedByDTO>
            label="Created By"
            title="Created By"
            labelValue={preSearch.createdByName ?? ""}
            name="createdBy"
            columns={[
              {
                header: "User First Name",
                accessorKey: "userFirstName",
              },
              {
                header: "User Last Name",
                accessorKey: "userLastName",
              },
            ]}
            inputFields={[
              {
                label: "User First Name",
                name: "firstName",
              },
              {
                label: "User Last Name",
                name: "lastName",
              },
            ]}
            apiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/created_by`}
            pageApiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/created_by/page`}
            onChangeAllValues={(e) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  createdBy: e.userSec ?? "",
                  createdByName: e.userFirstName ?? "",
                };
              });
            }}
          />
          <SuperRefCodesDropdown
            apiEndpoint="/api/v1/inventory/inventory_management/receive_item/intra_facility/receive_from_status"
            label="Receive Status"
            name="status"
            value={preSearch.status ?? ""}
            onChange={(v) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  status: v?.value ?? "",
                };
              });
            }}
          />
          <SuperPopover<IntraFacIndentNoDTO>
            label="Indent No."
            title="Indent No."
            labelValue={preSearch.indentNo ?? ""}
            name="indentNo"
            columns={[
              {
                header: "Indent No.",
                accessorKey: "indentNo",
              },
              {
                header: "Indent Date",
                accessorKey: "indentDate",
              },
            ]}
            inputFields={[
              {
                label: "Indent No.",
                name: "indentNo",
              },
            ]}
            apiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/indent_no`}
            pageApiEndpoint={`/api/v1/inventory/inventory_management/receive_item/intra_facility/indent_no/page`}
            onChangeAllValues={(e) => {
              setPreSearch((prevValue) => {
                return {
                  ...prevValue,
                  indentNo: e.indentNo ?? "",
                };
              });
            }}
          />
        </div>
      </div>
    </form>
  );
}
