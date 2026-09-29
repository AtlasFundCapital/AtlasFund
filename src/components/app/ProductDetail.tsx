import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowLeft } from "@/components/icons";
import { SampleBadge } from "@/components/site/blocks";
import { ShareBar, Spark } from "@/components/art/charts";

/** Shared layout for fund and vault detail pages. */
export function ProductDetail({
  back,
  kicker,
  name,
  summary,
  cover,
  facts,
  allocationTitle,
  allocation,
  seed,
  children,
  panel,
}: {
  back: { href: string; label: string };
  kicker: string;
  name: string;
  summary: string;
  cover: string;
  facts: { label: string; value: string }[];
  allocationTitle: string;
  allocation: { label: string; share: number }[];
  seed: number;
  children: ReactNode;
  panel: ReactNode;
}) {
  return (
    <>
      <section className="wrap pt-8">
        <Link href={back.href} className="inline-flex items-center gap-2 text-[13px] text-body hover:text-ink">
          <ArrowLeft className="size-4" /> {back.label}
        </Link>
        <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="label">{kicker}</p>
            <h1 className="h-display mt-3 text-[clamp(36px,4.6vw,60px)]">{name}</h1>
            <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-body">{summary}</p>
          </Reveal>
          <Reveal delay={80}>
            <img src={cover} alt="" className="aspect-[16/9] w-full rounded-xl object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="wrap grid grid-cols-1 gap-8 py-12 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-8">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="card p-4">
                <p className="text-[12px] text-mute">{f.label}</p>
                <p className="mt-1.5 text-[14px] font-medium leading-snug text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[15px] font-medium text-ink">Share value</p>
              <SampleBadge>Illustrative path, not performance</SampleBadge>
            </div>
            <Spark seed={seed} className="mt-4 h-[160px] w-full" />
            <p className="mt-2 text-[12px] text-mute">The live chart replaces this preview once the contract is deployed; it will be read from the pricing contract block by block.</p>
          </div>

          <div className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[15px] font-medium text-ink">{allocationTitle}</p>
              <SampleBadge>Design target</SampleBadge>
            </div>
            <div className="mt-5">
              <ShareBar parts={allocation} />
            </div>
          </div>

          <div className="prose-atlas">{children}</div>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">{panel}</aside>
      </section>
    </>
  );
}
