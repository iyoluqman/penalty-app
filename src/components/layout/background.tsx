import { type PropsWithChildren } from "react";
import { Backdrop } from "./backdrop";

export default function Background({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-col p-6">
      <Backdrop />
      <div className="border-1.5 flex h-full flex-col overflow-auto rounded-lg border-indigo-300">
        {children}
      </div>
    </div>
  );
}
