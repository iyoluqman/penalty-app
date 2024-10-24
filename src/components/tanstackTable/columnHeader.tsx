import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { type Column, type Header, flexRender } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TableHead } from "../ui/table";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  header: Header<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  className,
  header,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const columnRelativeDepth = header.depth - header.column.depth;
  if (
    !header.isPlaceholder &&
    columnRelativeDepth > 1 &&
    header.id === header.column.id
  ) {
    return null;
  }
  if (columnRelativeDepth > 1) {
    return null;
  }

  let rowSpan = 1;
  if (header.isPlaceholder) {
    const leafs = header.getLeafHeaders();
    // @ts-expect-error lib
    rowSpan = leafs[leafs.length - 1].depth - header.depth;
  }

  if (!column.getCanSort()) {
    // if (column.depth > 0) return null;
    return (
      <TableHead
        className={cn(className)}
        colSpan={header.colSpan}
        rowSpan={rowSpan}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="tableHeader"
              size="sm"
              type="button"
              className="h-8 data-[state=open]:bg-blue-200"
            >
              <span className="capitalize">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableHead>
    );
  }

  return (
    <TableHead
      className={cn(className)}
      colSpan={header.colSpan}
      rowSpan={rowSpan}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="tableHeader"
            size="sm"
            className="h-8 data-[state=open]:bg-blue-200"
          >
            <span className="capitalize">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
