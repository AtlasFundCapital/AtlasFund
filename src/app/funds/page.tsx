import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/site/Accordion";
import { Columns, CtaBand, PageHero, PostGrid, Section, SectionHead, TitleCards } from "@/components/site/blocks";
import { FundArchitecture } from "@/components/art/diagrams";
import { ArrowRight } from "@/components/icons";
import { FUNDS } from "@/content/products";

export const metadata: Metadata = {
  title: "Funds",
  description: "Tokenised funds on Robinhood Chain: one share token, onchain net asset value, and policies enforced at the contract level.",
};

export default function FundsPage() {
  return (
    <>
      <PageHero
        title="Tokenised funds, priced by the chain itself"
        lead="Atlas funds hold a spread of positions behind one share token. Value per share is computed onchain every block, and every trade the fund can make is fixed in its policy."
        actions={
          <>
            <Link href="#funds" className="btn">
              See the funds
            </Link>
            <Link href="/docs/funds" className="btn btn-light">
              Start integrating
            </Link>
          </>
        }
        aside={<img src="/art/cube.webp" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />}
      />

      <Section className="scroll-mt-24">
        <div id="funds" className="scroll-mt-24" />
        <SectionHead title="Three funds, one rulebook" />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {FUNDS.map((f, i) => (
            <Reveal key={f.slug} delay={i * 60} className="h-full">
              <Link href={`/funds/${f.slug}`} className="card group relative flex h-full flex-col overflow-hidden transition-colors hover:bg-card-2">
                <img src={f.cover} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col p-5 pb-16">
                  <p className="label">{f.asset}</p>
                  <p className="mt-2 text-[24px] tracking-tight text-ink">{f.name}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-body">{f.summary}</p>
                </div>
                <span className="absolute bottom-5 right-5 grid size-9 place-items-center rounded-lg bg-ink text-white">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Every fund runs on the same three layers" />
        <FundArchitecture />
        <div className="mt-12">
          <Columns
            items={[
              { title: "Onchain pricing", text: "A pricing contract reads the fund's balances and oracle prices to compute value per share. Any block can be re-priced by anyone, so the number never depends on our word." },
              { title: "Enforced policy", text: "The accounts that hold fund positions accept only whitelisted actions on whitelisted venues. Anything else is refused by the contract, with no manual override." },
              { title: "Composable shares", text: "Shares are standard tokens. They are minted at net asset value on subscription, burned on redemption, and can be held or used by any other contract." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead title="Made for apps, providers and platforms" />
        <Accordion
          items={[
            { title: "Wallets and consumer apps", lead: "A diversified balance behind one token", text: "Show a fund share next to ETH and stablecoins. The fund handles allocation, rebalancing and exits; your app handles the experience.", cta: { label: "Talk to us", href: "/contact?topic=Funds" } },
            { title: "Yield and staking providers", lead: "A home for idle balances", text: "Park buffers in a fund with published limits instead of building and monitoring your own positions.", cta: { label: "Talk to us", href: "/contact?topic=Funds" } },
            { title: "Fintech products", lead: "Onchain yield with an audit trail", text: "Every subscription, redemption and rebalance is a public transaction your compliance team can check on the explorer.", cta: { label: "Read the docs", href: "/docs/funds" } },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact?topic=Funds" className="btn">
            Speak with us
          </Link>
          <Link href="/docs/funds" className="btn btn-light">
            Read the docs
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHead title="Security and monitoring" />
        <TitleCards
          items={[
            { title: "Reviewed", text: "Contracts go through independent review before launch. Review reports will be linked from each fund page as soon as they are final." },
            { title: "Monitored", text: "Oracle freshness, price deviation, venue health and liquidity are tracked for every position, on every block." },
            { title: "Agent-enforced", text: "Automated agents respond within seconds when a threshold is crossed, and can only take actions the fund policy already allows." },
          ]}
        />
      </Section>

      <CtaBand title="Want a fund share inside your product?" text="Tell us what you are building." actions={<Link href="/contact?topic=Funds" className="btn">Speak with us</Link>} />
      <PostGrid title="Related articles" filter={(a) => a.topic === "Funds"} />
    </>
  );
}
