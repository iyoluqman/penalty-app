type SearchParams = Record<string, string | string[] | undefined | number>;

type Nav = {
  name: string;
  level?: number;
  href?: string;
  query?: string;
  description?: string;
  children?: Nav[];
};

type PaginateResponse = {
  totalPages: number;
  total: number;
  size: number;
};

type TableHeader = {
  key?: string;
  label?: string;
  sortable?: boolean;
  className?: string;
  sortDirection?: string;
  item?: React.ReactNode;
};

type TableHeaders = (string | TableHeader)[];

type FormActionState =
  | { success: true; error?: string }
  | "DELETE"
  | {
      success: false;
      error?: string;
    };

type ProblemDetailsDTO = {
  type?: string;
  title?: string;
  status?: string;
  detail?: string;
  instance?: string;
  code?: string;
  error?: string;
  path?: string;
  messageDetails?: string;
  message?: string;
};
