import { type PropsWithChildren } from "react";
import Command from "../command/command";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-white">
        <body className="h-full">
        ```
      */}
      <div>
        <Header />
        {/* <div className="hidden lg:h-screen lg:overflow-y-auto lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <Sidebar />
        </div> */}
        {/* Static sidebar for desktop */}
        {/* <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"> */}
        {/* <div className="flex flex-row">
          <div className="hidden lg:h-screen lg:overflow-y-auto lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <Sidebar />
          </div>
          <div className="">
            <main className="py-10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </div> */}

        <div className="relative mx-auto flex justify-center">
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="sticky top-[4rem] h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden border-r border-gray-200 px-6">
              {/* <Navigation navigation={navigation} className="w-64 pr-8 xl:w-72 xl:pr-16" /> */}
              <div className="pointer-events-none sticky top-0 z-10">
                <div className="h-6 bg-white dark:bg-slate-900"></div>
                <div className="pointer-events-auto relative bg-white dark:bg-slate-900">
                  <Command />
                  {/* <button
                    type="button"
                    className="hidden w-full lg:flex items-center leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 "
                  >
                    <MagnifyingGlassIcon className="flex-none size-5 text-slate-400 mr-3" aria-hidden="true" />
                    Quick search...<span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
                  </button> */}
                </div>
                <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900"></div>
              </div>
              <Sidebar />
            </div>
          </div>
          <div className="min-w-0 max-w-7xl flex-auto lg:max-w-none lg:pr-0">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
