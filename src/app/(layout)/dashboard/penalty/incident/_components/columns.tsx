import { type ColumnDef } from "@tanstack/react-table";

// TODO: Change DTO to correct DTO. ReporterDetailsDTO is temporary
export const columns: ColumnDef<ReporterDetailsDTO>[] = [
  {
    header: "Incident Transaction No.",
  },
  {
    header: "Incident Code",
  },
  {
    header: "Incident Description",
  },
  {
    header: "LPO Number",
  },
  {
    header: "Proposed Penalty Amount (RM)",
  },
  {
    header: "Created Date",
  },
  {
    header: "Created By",
  },
  {
    header: "Updated By",
  },
  {
    header: "Incident Status",
  },
  {
    header: "Verification Status",
  },
  {
    header: "Payment Status",
  },
  {
    header: "Penalty Amount From Supplier (RM)",
  },
];
