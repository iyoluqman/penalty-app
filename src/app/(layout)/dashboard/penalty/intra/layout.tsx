import ContentLayout from "@/components/layout/contentLayout";
import type React from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return <ContentLayout>{props.children}</ContentLayout>;
}
