import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function Card({ title, description, href }: Props) {
  return (
    <Link href={href}>
      <div className="rounded border px-6 py-6 shadow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="font-light text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
