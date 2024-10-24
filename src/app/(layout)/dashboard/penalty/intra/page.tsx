import { DataTable } from "./_components/dataTable";
import { Search } from "./_components/search";

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <Search />
      <DataTable searchParams={searchParams} />
    </>
  );
}
