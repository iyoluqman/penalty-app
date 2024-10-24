"use client";

import { Table } from "@/components/tanstackTable/table";
import { formatDateTime } from "@/lib/utils";
import { api } from "@/trpc/react";
import { keepPreviousData } from "@tanstack/react-query";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SuperTableClient<TData>(props: {
  apiEndpoint: string;
  pageApiEndpoint?: string;
  searchParams?: SearchParams;
  columns?: ColumnDef<TData>[];
  onRowClick?: (row: TData) => void;
  dataKey?: string;
  isStateful?: boolean;
  defaultSize?: number;
  excludeColumns?: string[];
  excludeSorting?: string[];
  href?: string;
  onApiError?: (error: ProblemDetailsDTO) => void;
  expandable?: boolean;
  expandableKey?: string;
  rowSpanWhenExpanded?: number;
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode;
  rowSelectionKey?: string;
  enableRowSelection?: boolean;
  consoleLog?: boolean;
}) {
  const {
    apiEndpoint: dataUrl,
    pageApiEndpoint: dataPageUrl,
    searchParams: dataSearchParams,
    columns,
    onRowClick,
    isStateful = false,
    defaultSize = 10,
    excludeColumns,
    excludeSorting,
    href,
    onApiError,
    expandable,
    expandableKey,
    rowSpanWhenExpanded,
    renderExpandedRow,
    rowSelectionKey,
    enableRowSelection,
    consoleLog,
  } = props;
  const enablePagination = !!dataPageUrl;
  const [sStateParams, setSStateParams] = useState({
    page: 1,
    size: defaultSize,
    sort: "",
    sortDirection: "",
  });
  const urlSearchParams = useSearchParams();
  const uSearchParams = Object.fromEntries(urlSearchParams.entries());
  let searchParamsSize = uSearchParams
    ? uSearchParams[props.dataKey ? `${props.dataKey}Size` : "size"]
    : undefined;
  if (!searchParamsSize && defaultSize) {
    searchParamsSize = defaultSize.toString();
  }

  const searchParams = isStateful
    ? { ...dataSearchParams, ...sStateParams }
    : {
        ...(dataSearchParams ?? uSearchParams),
        page: uSearchParams[props.dataKey ? `${props.dataKey}Page` : "page"],
        size: searchParamsSize,
        sort: uSearchParams[props.dataKey ? `${props.dataKey}Sort` : "sort"],
        sortDirection:
          uSearchParams[
            props.dataKey ? `${props.dataKey}SortDirection` : "sortDirection"
          ],
      };
  // const { data, isLoading } = useQuery({
  //   queryKey: ["data", dataUrl, searchParams],
  //   queryFn: () => getData<TData>(dataUrl, searchParams ?? {}),
  //   placeholderData: keepPreviousData,
  // });
  const { data: qData, isLoading } = api.common.getData.useQuery(
    {
      endpoint: dataUrl,
      searchParams,
    },
    {
      placeholderData: keepPreviousData,
    }
  );
  const data = qData as TData[] | undefined;
  if (consoleLog) {
    console.log(data);
  }
  const { page, sort, sortDirection, ...pageSearchParams } = searchParams;
  // const { data: pgData, isLoading: isPgLoading } = useQuery({
  //   queryKey: ["dataPage", dataPageUrl, pageSearchParams],
  //   queryFn: ({ queryKey }) =>
  //     getDataPaging(dataPageUrl ?? "", pageSearchParams ?? {}),
  //   placeholderData: keepPreviousData,
  //   enabled: enablePagination,
  // });

  const { data: pgData } = api.common.getDataPaging.useQuery(
    {
      endpoint: dataPageUrl ?? "",
      searchParams: pageSearchParams,
    },
    {
      placeholderData: keepPreviousData,
      enabled: enablePagination,
    }
  );

  useEffect(() => {
    // @ts-expect-error expect error
    if (data?.status > 299) {
      onApiError?.(data as ProblemDetailsDTO);
    }
  }, [data]);

  useEffect(() => {
    if (isStateful && sStateParams.page !== 1) {
      setSStateParams((prev) => {
        return {
          ...prev,
          page: 1,
        };
      });
    }
  }, [dataSearchParams]);
  return (
    <Table
      isLoading={isLoading}
      enablePagination={enablePagination}
      data={
        (data?.length ?? 0) > 0
          ? ((data?.map((d) => {
              const keys = Object.keys(d as object);
              const returnData = {};
              for (const k of keys) {
                // @ts-expect-error expect error
                returnData[k] = d[k as keyof TData];
                // regex check if k is a valid Date
                const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
                // check if d[k] contains regex
                // if it does, format its
                // @ts-expect-error expect error
                if (regex.test(d[k as keyof TData])) {
                  // @ts-expect-error expect error
                  returnData[k] = formatDateTime(d[k as keyof TData]);
                  // returnData[k] = d[k];
                }
              }
              return returnData;
            }) as TData[]) ?? [])
          : []
      }
      defaultSize={defaultSize}
      pageCount={pgData?.totalPages ?? 1}
      pageState={isStateful ? Number(searchParams.page) : undefined}
      columns={columns}
      onRowClick={onRowClick}
      pageKey={props.dataKey ? `${props.dataKey}Page` : "page"}
      sizeKey={props.dataKey ? `${props.dataKey}Size` : "size"}
      sortKey={props.dataKey ? `${props.dataKey}Sort` : "sort"}
      onSortAndPaginateChange={
        isStateful
          ? (state) => {
              setSStateParams({
                ...state,
              });
            }
          : undefined
      }
      excludeColumns={excludeColumns}
      excludeSorting={excludeSorting}
      href={href}
      expandable={expandable}
      expandableKey={expandableKey}
      rowSpanWhenExpanded={rowSpanWhenExpanded}
      renderExpandedRow={renderExpandedRow}
      rowSelectionKey={rowSelectionKey}
      enableRowSelection={enableRowSelection}
    />
  );
}
