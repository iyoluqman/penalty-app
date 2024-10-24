"use client";

import Input from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { appendQueryParams, getFormDataAndQuery } from "@/lib/search";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { RefreshCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <form
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        const { form, query } = getFormDataAndQuery(e, pathname);
        const q = appendQueryParams(query, form);
        router.push(q.href);
      }}
      className=""
    >
      <div className="mt-4 sm:flex sm:items-center">
        <h1 className="w-full text-base font-semibold uppercase leading-6 text-gray-900">
          Incident
        </h1>
        <div className="flex flex-row justify-end gap-2">
          <Button size="icon" variant="icon" type="button">
            <RefreshCw className="size-5" />
          </Button>
          <Input />
          <Button size="icon" variant="icon" type="button">
            <PlusIcon className="size-5" />
          </Button>
          <Button size="iconText" variant="search" type="submit">
            <MagnifyingGlassIcon className="mr-2 size-5" />
            Search
          </Button>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input label="Incident Code" />
        <Input label="Incident Description" />
        <Input label="Date From" />
        <Input label="Date To" />
        <Input label="LPO Number" />
        <Input label="Transaction Number" />
        <Input label="Incident Status" />
        <Input label="Verification Status" />
        <Input label="Payment Status" />
      </div>
    </form>
  );
}
