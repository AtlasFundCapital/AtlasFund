import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHero, PostGrid, Rows, Section, SectionHead, TitleCards } from "@/components/site/blocks";
import { AgentLoop } from "@/components/art/diagrams";
import { DepositsChart } from "@/components/art/charts";
import { ArrowRight, VaultMark } from "@/components/icons";
import { VAULTS } from "@/content/products";

export const metadata: Metadata = {
  title: "Vaults",
  description: "Automated lending vaults on Robinhood Chain in two risk tiers, with published caps and agents that exit on their own.",
};

const TIERS = [
  { tier: "Anchor" as const, lead: "Liquidity first, yield second", text: "Anchor vaults lend only into the deepest reviewed markets, keep a large idle buffer and cap each market tightly. Built for depositors who want their funds back on demand." },
  { tier: "Summit" as const, lead: "Wider reach for busier markets", text: "Summit vaults follow borrowing demand across a longer list of vetted markets and rebalance more often, while staying inside the same kind of written limits." },
];

export default function VaultsPage() {
  return (
    <>
      <PageHero
        title="Lending vaults that run on rules and automation"
        lead="Each vault has written risk limits and a set of agents that enforce them, so yield comes from the markets you signed up for and nothing else."
        actions={
          <>
            <Link href="#tiers" className="btn">
              Explore vaults
            </Link>
            <Link href="/docs/vaults" className="btn btn-light">
              Read the docs
            </Link>
          </>
        }
        aside={<img src="/art/vault.webp" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />}
      />

      <Section>
        <Reveal>
          <DepositsChart />
        </Reveal>
      </Section>

      <Section>
        <SectionHead title="Every vault is organised in three layers" />
        <Rows
          items={[
            { title: "Risk framework", text: "Written parameters decide which markets a vault may use, how much it may put in each, and how much must stay idle." },
            { title: "Live monitoring", text: "Utilisation, liquidity, rates and oracle health are tracked continuously so the vault always knows where it stands against its limits." },
            { title: "Automated agents", text: "Agents carry out the responses the policy allows, from rebalancing to full exits, without waiting for a person to wake up." },
          ]}
        />
      </Section>

      <Section>
        <div id="tiers" className="scroll-mt-24" />
        <SectionHead title="Two risk tiers, clearly separated" />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {TIERS.map((t, i) => (
            <Reveal key={t.tier} delay={i * 70} className="h-full">
              <div className="card flex h-full flex-col p-6">
                <span className="flex items-center gap-3">
                  <VaultMark className="size-10 text-ink" />
                  <span className="text-[44px] leading-none tracking-[-0.03em] text-ink">{t.tier}</span>
                </span>
                <p className="mt-5 text-[15px] font-medium text-ink">{t.lead}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-body">{t.text}</p>
                <ul className="mt-5 space-y-2">
                  {VAULTS.filter((v) => v.tier === t.tier).map((v) => (
                    <li key={v.slug}>
                      <Link href={`/vaults/${v.slug}`} className="flex items-center justify-between rounded-lg bg-card-2 px-4 py-3 text-[14px] text-ink hover:bg-paper">
                        <span>
                          <b className="font-medium">{v.name}</b> <span className="text-mute">· {v.asset}</span>
                        </span>
                        <span className="grid size-8 place-items-center rounded-md bg-ink text-white">
                          <ArrowRight className="size-4" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Where you will be able to use them" />
        <TitleCards
          items={[
            { title: "The Atlas app", text: "Deposit and withdraw from the app on this site with any browser wallet that supports Robinhood Chain." },
            { title: "Directly onchain", text: "Vaults follow a standard interface, so any wallet or script can deposit into the contract without going through us." },
            { title: "Inside other products", text: "Apps can route balances into a vault and show the share token as their own savings feature." },
          ]}
        />
      </Section>

      <Section>
        <SectionHead title="Agents watch markets, check limits and act in seconds" />
        <AgentLoop />
      </Section>

      <CtaBand
        title="Integrations, allocations or questions about a vault?"
        text="We are glad to walk through the parameters."
        actions={
          <>
            <Link href="/contact?topic=Vaults" className="btn">
              Speak with us
            </Link>
            <Link href="/docs/vaults" className="btn btn-light">
              Read the docs
            </Link>
          </>
        }
      />
      <PostGrid title="Related articles" filter={(a) => a.topic === "Vaults"} />
    </>
  );
}
