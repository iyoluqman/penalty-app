"use client";

import { ToastError } from "@/components/common/toastError";
import { SuperTableClient } from "@/components/tanstackTable/SuperTableClient";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { columns } from "./columns";

export function DataTable({ searchParams }: { searchParams: SearchParams }) {
  const urlSearchParams = useSearchParams();
  //const router = useRouter();
  const filteredSearchParams = useMemo(() => {
    return {
      ...searchParams,
      status: searchParams.status === "All" ? "" : searchParams.status,
    };
  }, [searchParams]);
  return (
    <SuperTableClient
      apiEndpoint=""
      pageApiEndpoint=""
      columns={columns}
      searchParams={filteredSearchParams}
      onApiError={(json) => {
        // ↓↓ Condition to not show popup on first render
        if (urlSearchParams.size > 0) {
          toast.error(<ToastError data={json} />);
        }
      }}
    />
  );
}
