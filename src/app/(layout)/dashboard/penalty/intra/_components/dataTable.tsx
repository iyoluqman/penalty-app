"use client";

import { SuperTableClient } from "@/components/tanstackTable/SuperTableClient";
import { useMemo } from "react";
import { columns } from "./columns";

export function DataTable({ searchParams }: { searchParams: SearchParams }) {
  // const urlSearchParams = useSearchParams();
  // const router = useRouter();
  // ↓↓ This is to intercept the 'All' value in dropdowns and parse empty string to API
  const filteredSearchParams = useMemo(() => {
    return {
      ...searchParams,
      receiveType:
        searchParams.receiveType === "All" ? "" : searchParams.receiveType,
      receiveStatus:
        searchParams.receiveStatus === "All" ? "" : searchParams.receiveStatus,
    };
  }, [searchParams]);

  return (
    <>
      <SuperTableClient
        apiEndpoint="/api/v1/inventory/inventory_management/receive_item/intra_facility"
        pageApiEndpoint="/api/v1/inventory/inventory_management/receive_item/intra_facility/page"
        searchParams={filteredSearchParams}
        columns={columns}
      />
    </>
  );
}
