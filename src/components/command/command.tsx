"use client";

import { cn } from "@/lib/utils";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  FolderIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useKeyPress } from "ahooks";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { NAVIGATION } from "../layout/sidebar";

function flattenMenu(menu: Nav[]): Nav[] {
  const flattenedMenu: Nav[] = [];

  function traverseMenu(menu: Nav[], parent?: string) {
    for (const item of menu) {
      flattenedMenu.push({
        ...item,
        query: parent ? `${parent}|${item.name}` : item.name,
      });

      if (item.children) {
        traverseMenu(
          item.children,
          parent ? `${parent}|${item.name}` : item.name
        );
      }
    }
  }

  traverseMenu(menu);

  return flattenedMenu.map((fm) => ({
    ...fm,
    level: fm.query?.split("|").length,
  }));
}
export const FLAT_NAVIGATION = flattenMenu(NAVIGATION);

export default function Command() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const router = useRouter();
  useKeyPress("meta.k", () => setOpen(true));
  useKeyPress("alt.k", () => setOpen(true));
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(window.navigator.userAgent.includes("Mac"));
    }
  }, []);
  const filtered =
    query === ""
      ? FLAT_NAVIGATION
      : FLAT_NAVIGATION.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="dark:highlight-white/5 hidden w-full items-center rounded-md py-1.5 pl-2 pr-3 leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 lg:flex"
      >
        <MagnifyingGlassIcon
          className="mr-3 size-5 flex-none text-slate-400"
          aria-hidden="true"
        />
        Quick search...
        <span className="ml-auto flex-none pl-3 text-xs font-semibold">
          {isMac ? `⌘` : <span className="font-light">Alt </span>}K
        </span>
      </button>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery("")}
        appear
      >
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white/70 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all dark:bg-white/60">
                <Combobox
                  onChange={(item: Nav) => {
                    if (item.href) {
                      router.push(item.href);
                      setOpen(false);
                    }
                  }}
                >
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute left-4 top-3.5 size-5 text-gray-900 text-opacity-40"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  {(query === "" || filtered.length > 0) && (
                    <Combobox.Options
                      static
                      className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                    >
                      <li className="p-2">
                        <ul className="text-sm text-gray-700">
                          {filtered.map((project, i) => {
                            return (
                              <CmdOption
                                key={`${project.href}${i}`}
                                project={project}
                                search={query !== ""}
                              />
                            );
                          })}
                        </ul>
                      </li>
                    </Combobox.Options>
                  )}

                  {query !== "" && filtered.length === 0 && (
                    <div className="px-6 py-14 text-center sm:px-14">
                      <FolderIcon
                        className="mx-auto h-6 w-6 text-gray-900 text-opacity-40"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-sm text-gray-900">
                        We couldn&#39;t find any menu with that term. Please try
                        again.
                      </p>
                    </div>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function CmdOption({
  project,
  search = false,
}: {
  project: Nav;
  search?: boolean;
}) {
  const icon = !project.children;
  if (search && !icon) {
    return <></>;
  }

  const projectQueryArr = project.query?.split("|") ?? [];
  // remove last item
  const projectHeaderTitle = projectQueryArr.slice(
    0,
    projectQueryArr.length - 1
  );
  return (
    <Combobox.Option
      value={project}
      className={({ active }) =>
        cn(
          "flex cursor-default select-none items-center rounded-md px-3 py-2",
          active && "bg-gray-900 bg-opacity-5 text-gray-900"
        )
      }
    >
      {({ active }) => (
        <>
          <div
            className={cn(
              !search && project.level === 1 && "ml-0",
              !search && project.level === 2 && "ml-8",
              !search && project.level === 3 && "ml-16",
              !search && project.level === 4 && "ml-24",
              !search && project.level === 5 && "ml-32"
            )}
          />
          {icon && (
            <FolderIcon
              className={cn(
                "h-6 w-6 flex-none text-gray-900 text-opacity-40",
                active && "text-opacity-100"
              )}
              aria-hidden="true"
            />
          )}
          <div className="flex-auto">
            {search && (
              <span className={cn("ml-3 flex flex-auto items-center truncate")}>
                {projectHeaderTitle.map((t, ti) => {
                  let seperator = <></>;
                  if (ti !== projectHeaderTitle.length - 1) {
                    seperator = <ChevronRightIcon className="h-3 w-3" />;
                  }
                  return (
                    <>
                      <span
                        className="text-xs text-gray-500"
                        key={`${t}-${ti}`}
                      >
                        {t}
                      </span>
                      {seperator}
                    </>
                  );
                })}
              </span>
            )}
            <span
              className={cn(
                icon ? "ml-3" : "ml-0 uppercase",
                "flex-auto truncate"
              )}
            >
              {project.name}
            </span>
          </div>
          {active && (
            <span className="ml-3 flex-none text-gray-500">Jump to...</span>
          )}
        </>
      )}
    </Combobox.Option>
  );
}
