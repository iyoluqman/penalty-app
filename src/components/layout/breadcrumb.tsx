"use client";

import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FLAT_NAVIGATION } from "../command/command";

export default function Breadcrumb() {
  const pathname = usePathname();
  // const currentNav = FLAT_NAVIGATION.find((nav) => nav.href === pathname);
  // const pages = currentNav?.query?.split("|") ?? [];

  function findValidNav(query: string): Nav | undefined {
    if (query === "/") {
      return undefined;
    }
    // check if query is valid
    const nav = FLAT_NAVIGATION.find((nav) => nav.href === query);
    // const nav = []
    if (nav) {
      return nav;
    }
    // if not valid, check if query is valid with the last part removed
    const queryParts = query.split("/").filter((part) => part !== "");
    queryParts.pop();
    const newQuery = `/${queryParts.join("/")}`;

    if (newQuery) {
      return findValidNav(newQuery);
    }
  }

  const currentNav = findValidNav(pathname);
  const pages = currentNav?.query?.split("|") ?? [];
  return (
    <nav className="flex w-full overflow-x-auto" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <p className="cursor-default text-gray-400 hover:text-gray-500">
              <HomeIcon className="size-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </p>
          </div>
        </li>
        {pages.map((page, idx) => {
          const url = pathname
            .split("/")
            .slice(0, idx + 3)
            .join("/");
          // const url = pathname
          //   .split("/")
          //   .slice(0, idx + 2)
          //   .join("/");
          return (
            <li key={`bcc-${idx}`}>
              <Link prefetch={false} href={url} className="flex items-center">
                <ChevronRightIcon
                  className="size-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p className="ml-2 cursor-default text-nowrap text-sm font-medium text-gray-500 hover:text-gray-700">
                  {page}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
