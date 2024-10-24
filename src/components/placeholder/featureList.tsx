"use client";

import { usePathname } from "next/navigation";
import { FLAT_NAVIGATION } from "../command/command";
import Card from "./card";

export default function FeatureList() {
  const pathname = usePathname();
  const currentNav = FLAT_NAVIGATION.find((nav) => nav.href === pathname);

  if (!currentNav) return <></>;

  return (
    <div className="py-2">
      <h2 className="text-xl font-bold">{currentNav.name}</h2>
      {currentNav.description && <p>{currentNav.description}</p>}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentNav.children?.map((child, i) => {
          return (
            <div key={`flc-${i}`}>
              <Card
                title={child.name}
                description={child.description ?? ""}
                href={child.href ?? ""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
