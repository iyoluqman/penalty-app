"use client";

import { env } from "@/env.mjs";
import { useEffect } from "react";

export default function CloseOrRedirect() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("close") !== "1") return;
    window.close();

    window.location.href = env.NEXT_PUBLIC_CENTRAL_URL;
  }, []);
  return <div />;
}
