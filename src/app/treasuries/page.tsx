import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHero, PostCard, PostGrid, Section, SectionHead, TitleCards } from "@/components/site/blocks";
import { findArticle } from "@/content/articles";

export const metadata: Metadata = {
  title: "Treasuries",
  description: "Treasury mandates on Robinhood Chain run under a written investment policy, executed from the client's own account.",
};

const STAGES = [
  {
    stage: "Policy and plan",
    steps: [
      { title: "Treasury diagnostics", text: "A full review of what the treasury holds, how concentrated it is, how long the runway lasts and how quickly it can raise cash." },
      { title: "Investment policy", text: "Drafted with your team and governance: permitted assets and venues, limits, liquidity floors and reporting duties." },
    ],
  },
  {
    stage: "Execution",
    steps: [
      { title: "Policy onchain", text: "The approved assets, venues and limits are encoded as permissions on your own account before anything is executed." },
      { title: "Allocation", text: "Capital is spread across strategies inside the limits the policy sets, and rebalanced when it drifts." },
    ],
  },
  {
    stage: "Reporting",
    steps: [
      { title: "Financial reports", text: "Monthly, quarterly and yearly reports for your team and your community, with every line linked to the chain." },
      { title: "Governance support", text: "Plain-language summaries and data for proposals whenever the policy itself needs to change." },
    ],
  },
];

export default function TreasuriesPage() {
  const cases = ["illustrative-case-study-a-token-team-treasury", "illustrative-case-study-an-app-embedding-vaults"].map((s) => findArticle(s)!);
  return (
    <>
      <PageHero
        title="Treasury management with a written plan"
        lead="Every mandate is shaped around one organisation's goals, risk appetite and governance, and executed without ever taking custody of its assets."
        aside={<img src="/art/stack.webp" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />}
      >
        <Reveal delay={200}>
          <div className="mt-12">
            <p className="text-[14px] text-body">Treasury assets under management</p>
            <p className="h-number mt-1 text-[40px] leading-none sm:text-[52px]">$0</p>
            <p className="mt-2 text-[13px] text-mute">Honest starting point: the first mandates are onboarded after launch.</p>
          </div>
        </Reveal>
      </PageHero>

      <Section>
        <SectionHead title="Mandates rest on three disciplines" />
        <TitleCards
          items={[
            { title: "Allocation", text: "Diversified positions inside the limits of your investment policy, managed toward long-term goals rather than this week's rates." },
            { title: "Token liquidity", text: "Plans for the liquidity of your own token: owned liquidity, measured buybacks and clear rules for any market-making arrangement." },
            { title: "Execution", text: "Every transaction goes through permissions on your account. The assets never leave your custody and every action is public." },
          ]}
        />
      </Section>

      <Section>
        <SectionHead title="Every mandate moves through three stages" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-2">
          {STAGES.map((s, i) => (
            <Reveal key={s.stage} delay={i * 70}>
              <p className="mb-3 text-[13px] text-body">{s.stage}</p>
              <div className="space-y-2">
                {s.steps.map((st) => (
                  <div key={st.title} className="card min-h-[140px] p-5">
                    <p className="text-[18px] font-medium tracking-tight text-ink">{st.title}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-body">{st.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Every mandate starts with a conversation."
        text="Tell us about your treasury, your goals and your limits."
        actions={
          <Link href="/contact?topic=Treasury%20mandate" className="btn">
            Speak with us
          </Link>
        }
      />

      <Section>
        <SectionHead title="Case studies (illustrative)" />
        <div className="-mx-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {cases.map((a) => (
            <PostCard key={a.slug} a={a} />
          ))}
        </div>
        <p className="mt-4 text-[12px] text-mute">Both case studies describe hypothetical mandates to show the process. They are not client records.</p>
      </Section>

      <PostGrid title="Related articles" filter={(a) => a.topic === "Treasuries"} />
    </>
  );
}
