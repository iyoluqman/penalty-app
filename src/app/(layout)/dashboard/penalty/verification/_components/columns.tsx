import { type ColumnDef } from "@tanstack/react-table";

// TODO: Change DTO to correct DTO. ReporterDetailsDTO is temporary
export const columns: ColumnDef<ReporterDetailsDTO>[] = [
  {
    header: "Verification Transaction No.",
  },
  {
    header: "LPO No.",
  },
  {
    header: "Penalty Amount",
  },
  {
    header: "Status",
  },
  {
    header: "Created Date",
  },
  {
    header: "Created By",
  },
  {
    header: "Updated Date",
  },
  {
    header: "Updated By",
  },
];
