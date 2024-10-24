import { SuperTableClient } from "@/components/tanstackTable/SuperTableClient";
import { columns } from "./_components/columns";
import { Search } from "./_components/search";

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div>
      <Search />
      <div className="mt-4">
        <SuperTableClient
          searchParams={searchParams}
          apiEndpoint="/api/v1/maintenance/facility/pharmacy/admin_route"
          pageApiEndpoint="/api/v1/maintenance/facility/pharmacy/admin_route/page"
          columns={columns}
        />
      </div>
    </div>
  );
}
