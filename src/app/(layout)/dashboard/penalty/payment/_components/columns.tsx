import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PenaltyPaymentDTO>[] = [
  {
    header: "Payment Transaction No.",
    accessorKey: "paymentTransactionNo",
  },
  {
    header: "Verification Transaction Number",
    accessorKey: "verificationTransactionNo",
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
  },
  {
    header: "LPO No.",
    accessorKey: "lpoNo",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Created Date",
    accessorKey: "createdDate",
  },
  {
    header: "Created By",
    accessorKey: "createdBy",
  },
  {
    header: "Updated Date",
    accessorKey: "updatedDate",
  },
  {
    header: "Updated By",
    accessorKey: "updatedBy",
  },
];
