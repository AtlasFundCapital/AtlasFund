import type { Metadata } from "next";
import Link from "next/link";
import { DocBody, DocsShell } from "@/components/site/DocsShell";
import { DOCS, findDoc } from "@/content/docs";

export const metadata: Metadata = { title: "Docs", description: "How Atlas Fund funds, vaults, treasuries, wallet connection and the $ATLAS token work." };

export default function DocsIndex() {
  const d = findDoc("overview")!;
  return (
    <DocsShell active="overview">
      <h1 className="h-display text-[clamp(34px,4.4vw,56px)]">{d.title}</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-body">{d.lead}</p>
      <DocBody body={d.body} />
      <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {DOCS.filter((x) => x.slug !== "overview").map((x) => (
          <Link key={x.slug} href={`/docs/${x.slug}`} className="card p-5 transition-colors hover:bg-card-2">
            <p className="text-[17px] font-medium text-ink">{x.title}</p>
            <p className="mt-1 text-[13px] text-body">{x.lead}</p>
          </Link>
        ))}
      </div>
    </DocsShell>
  );
}
