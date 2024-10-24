"use client";

import { cn } from "@/lib/utils";
// spell-checker: disable
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export const NAVIGATION = [
  { name: "Home", href: "/" },
  {
    name: "Penalty",
    href: "/dashboard/penalty",
    children: [
      {
        name: "Incident",
        href: "/dashboard/penalty/incident",
      },
      {
        name: "Verification",
        href: "/dashboard/penalty/verification",
      },
      {
        name: "Payment",
        href: "/dashboard/penalty/payment",
      },
      {
        name: "Intra",
        href: "/dashboard/penalty/intra",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex w-56 grow flex-col gap-y-5 bg-white px-6 dark:bg-slate-900 lg:px-0">
      <div className="flex h-16 shrink-0 items-center gap-x-4 lg:hidden">
        <div className="relative h-11 w-11">
          <Image src="" className="" fill sizes="100%" alt="PhIS" priority />
        </div>
        PhIS
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="space-y-1">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      href={item.href}
                      className={cn(
                        item.href === pathname
                          ? "bg-gray-100 dark:bg-slate-700"
                          : "hover:bg-gray-100 dark:hover:bg-slate-700",
                        "block rounded-md px-2 leading-6 text-gray-700 dark:text-slate-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <NavWithChildren item={item} />
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

type Nav = {
  name: string;
  current?: boolean;
  children?: Nav[];
  href?: string;
};
type NavWithChildrenProps = Nav & {
  children?: NavWithChildrenProps[];
};
type NavCProps = {
  item: NavWithChildrenProps;
};
function NavWithChildren({ item }: PropsWithChildren<NavCProps>) {
  const pathname = usePathname();
  const isCurrent = item.href ? pathname.includes(item.href) : false;
  const router = useRouter();
  return (
    <Disclosure as="div" defaultOpen={isCurrent}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={cn(
              item.href === pathname
                ? "bg-blue-200 dark:bg-slate-700"
                : "hover:bg-[#E8F2FF] dark:hover:bg-slate-700",
              "flex w-full flex-row items-center justify-between gap-x-3 rounded-md px-2 text-left leading-6 text-gray-700 dark:text-gray-300"
            )}
            onClick={() => {
              if (item.href) {
                router.push(item.href);
              }
            }}
          >
            {item.name}

            <ChevronRightIcon
              className={cn(
                open
                  ? "rotate-90 text-gray-500 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-300",
                "h-3 w-5 shrink-0"
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel as={"div"} className="mt-1 pl-2">
            <ul className="border-l">
              {item.children?.map((subItem) => {
                if (!subItem.children) {
                  return (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.href ?? ""}
                        className={cn(
                          subItem.href === pathname
                            ? "bg-blue-200 dark:bg-slate-700"
                            : "hover:bg-[#E8F2FF] dark:hover:bg-slate-700",
                          "block rounded-md pl-4 pr-2 leading-6 text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  );
                }
                return (
                  <div key={subItem.name} className="pl-2">
                    <NavWithChildren item={subItem} />
                  </div>
                );
              })}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
