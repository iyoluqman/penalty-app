import clsx from "clsx";
import React, { Suspense } from "react";
import Breadcrumb from "./breadcrumb";

export default function ContentLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("px-4 py-6 sm:px-6 lg:px-8", className)}>
      <Suspense>
        <Breadcrumb />
      </Suspense>
      {children}
    </div>
  );
}
