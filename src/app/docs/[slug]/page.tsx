import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocBody, DocsShell } from "@/components/site/DocsShell";
import { DOCS, findDoc } from "@/content/docs";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => DOCS.filter((d) => d.slug !== "overview").map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = findDoc((await params).slug);
  return d ? { title: `Docs: ${d.title}`, description: d.lead } : {};
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const d = findDoc(slug);
  if (!d || slug === "overview") notFound();
  const i = DOCS.findIndex((x) => x.slug === slug);
  const next = DOCS[i + 1];
  return (
    <DocsShell active={slug}>
      <h1 className="h-display text-[clamp(34px,4.4vw,56px)]">{d.title}</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-body">{d.lead}</p>
      <DocBody body={d.body} />
      {next && (
        <Link href={`/docs/${next.slug}`} className="card mt-10 block p-5 hover:bg-card-2">
          <p className="text-[12px] text-mute">Next</p>
          <p className="text-[17px] font-medium text-ink">{next.title} →</p>
        </Link>
      )}
    </DocsShell>
  );
}
