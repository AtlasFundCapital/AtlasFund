import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PostGrid, SampleBadge, Section, Stat } from "@/components/site/blocks";
import { Treemap } from "@/components/art/charts";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Reports",
  description: "How Atlas Fund discloses holdings and results. Figures are samples until the first mandates and vaults are live.",
};

const ROWS = [
  { name: "Sample mandate A", kind: "Token team treasury", aum: "$4,200,000", result: "$11,300" },
  { name: "Sample mandate B", kind: "Protocol reserve", aum: "$2,750,000", result: "$6,940" },
  { name: "Anchor USD", kind: "Vault", aum: "$1,900,000", result: "$5,120" },
  { name: "Summit USD", kind: "Vault", aum: "$1,150,000", result: "$4,480" },
  { name: "Atlas Core Fund", kind: "Fund", aum: "$800,000", result: "$2,010" },
];

export default function ReportsPage() {
  return (
    <>
      <section className="wrap pt-8">
        <Reveal>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <SampleBadge>Sample layout · no live assets yet</SampleBadge>
            <p className="text-[13px] text-mute">Every number on this page is a placeholder that shows the report format. Real figures replace them after launch.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <Stat label="Non-custodial assets under management" value="$10,800,000" note="Sample" />
          <Stat label="Last month net results" value="$29,850" note="Sample" />
          <Stat label="Capital deployed onchain, all time" value="$0" note="Actual: nothing is deployed before launch" />
        </div>
      </section>

      <Section>
        <p className="mb-3 text-[13px] text-body">Split across mandates and products</p>
        <Treemap
          items={[
            { label: "Mandate A", share: 39 },
            { label: "Mandate B", share: 25 },
            { label: "Anchor USD", share: 18 },
            { label: "Summit USD", share: 11 },
            { label: "Core", share: 7 },
          ]}
        />
      </Section>

      <Section className="pt-0">
        <div className="hidden grid-cols-[2fr_1fr_1fr_40px] gap-4 px-5 pb-3 text-[13px] text-body md:grid">
          <span>Mandate or product</span>
          <span>Assets</span>
          <span>Last month results</span>
          <span />
        </div>
        <div className="space-y-2">
          {ROWS.map((r) => (
            <div key={r.name} className="card grid grid-cols-2 items-center gap-3 p-4 md:grid-cols-[2fr_1fr_1fr_40px] md:px-5">
              <div className="col-span-2 flex items-center gap-4 md:col-span-1">
                <span className="dots hidden h-12 w-20 shrink-0 rounded-md bg-paper-2 sm:block" />
                <span>
                  <span className="block text-[17px] tracking-tight text-ink">{r.name}</span>
                  <span className="block text-[12px] text-mute">{r.kind}</span>
                </span>
              </div>
              <span className="font-mono text-[13px] text-ink">
                <span className="mr-2 text-mute md:hidden">Assets</span>
                {r.aum}
              </span>
              <span className="font-mono text-[13px] text-ink">
                <span className="mr-2 text-mute md:hidden">Results</span>
                {r.result}
              </span>
              <ArrowUpRight className="hidden size-5 text-mute md:block" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-mute">After launch each row links to the onchain accounts it describes.</p>
      </Section>

      <PostGrid title="Report format and research" filter={(a) => a.category === "reports" || a.category === "research"} />
    </>
  );
}
