"use client";

import Input from "@/components/form/input";
import { SuperRefCodesDropdown } from "@/components/form/superDropdown/superRefCodesDropdown";
import { SuperPopover } from "@/components/form/superPopover/superPopover";
import { Button, buttonVariants } from "@/components/ui/button";
import { appendQueryParams, getFormDataAndQuery } from "@/lib/search";
import { useSearchState } from "@/lib/useSearchState";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const { preSearch, search, setPreSearch, executeSearch, resetSearch } =
    useSearchState({
      paymentTransactionNo: "",
      verificationTransactionNo: "",
      supplierCode: "",
      supplierName: "",
      lpoNo: "",
      createdDateFrom: "",
      createdDateTo: "",
      status: "All",
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
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <h1 className="text-base font-semibold uppercase leading-6 text-gray-900">
            Payment
          </h1>
          <div className="mt-2 flex flex-row justify-end gap-2 sm:mt-0">
            <Link
              className={cn(buttonVariants({ variant: "icon", size: "icon" }))}
              href=""
            >
              <PlusIcon className="size-5" />
            </Link>
            <Button
              size="icon"
              variant="icon"
              type="submit"
              onClick={() => {
                resetSearch();
              }}
            >
              <RefreshCw className="size-5" />
            </Button>
            <Button
              size="iconText"
              variant="search"
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
        <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          <Input
            label="Payment Transaction No."
            name="paymentTransactionNo"
            value={preSearch.paymentTransactionNo ?? ""}
          />
          <Input
            label="Verification Transaction No."
            name="paymentTransactionNo"
            value={preSearch.verificationTransactionNo ?? ""}
          />
          <SuperPopover
            label="Supplier Name"
            title="Search Supplier"
            labelValue={preSearch.supplierName ?? ""}
            inputFields={[
              {
                name: "supplierName",
                label: "Supplier Name",
              },
              {
                name: "supplierCode",
                label: "Supplier Code",
              },
            ]}
            apiEndpoint="/api/v1/inventory/utils/supplier_name"
            pageApiEndpoint="/api/v1/inventory/utils/supplier_name/page"
            targetColumnLabelKey="supplierCode"
            targetColumnValueKey="supplierName"
            columns={[
              {
                header: "Supplier Name",
                accessorKey: "supplierName",
              },
              {
                header: "Supplier Code",
                accessorKey: "supplierCode",
              },
            ]}
            onChange={(supplierCode, supplierName) => {
              setPreSearch((prevValue) => ({
                ...prevValue,
                supplierCode,
                supplierName,
              }));
            }}
          />
          <Input label="LPO No." name="lpoNo" value={preSearch.lpoNo ?? ""} />
          <Input
            type="date"
            label="Created Date From"
            name="createdDateFrom"
            value={preSearch.createdDateFrom ?? ""}
            onChange={(e) => {
              setPreSearch((prevValue) => ({
                ...prevValue,
                createdDateFrom: e.target.value ?? "",
              }));
            }}
          />
          <Input
            type="date"
            label="Created Date To"
            name="createdDateTo"
            value={preSearch.createdDateTo ?? ""}
            onChange={(e) => {
              setPreSearch((prevValue) => ({
                ...prevValue,
                createdDateTo: e.target.value ?? "",
              }));
            }}
          />
          <SuperRefCodesDropdown
            apiEndpoint="/api/v1/inventory/utils/payment_status"
            label="Status"
            optionAll
            value={preSearch.status ?? "All"}
            onChange={(v) => {
              setPreSearch((prevValue) => ({
                ...prevValue,
                status: v?.value ?? "",
              }));
            }}
          />
        </div>
      </div>
    </form>
  );
}
