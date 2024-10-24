"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<IntraFacilityListDTO>[] = [
  {
    header: "Receipt No.",
    accessorKey: "receiptNo",
  },
  {
    header: "Receive Type",
    accessorKey: "receiveType",
  },
  {
    header: "Indent No",
    accessorKey: "indentaNo",
  },
  {
    header: "Receive Date/Time",
    accessorKey: "receiveDateTime",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.receiveDate)}</div>;
    },
  },
  {
    header: "Note No.",
    accessorKey: "noteNo",
  },
  {
    header: "Receive from Unit Name",
    accessorKey: "receiveFromUnitName",
  },
  {
    header: "Created By",
    accessorKey: "createdBy",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
