import ContentLayout from "@/components/layout/contentLayout";

export default function Layout(props: { children: React.ReactNode }) {
  return <ContentLayout>{props.children}</ContentLayout>;
}
