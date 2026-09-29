import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Logo";
import { LiveBlock } from "@/components/LiveChain";
import { Accordion } from "@/components/site/Accordion";
import { PageHero, PostGrid, ProductCards, Section, SectionHead } from "@/components/site/blocks";
import { StandardsStrip } from "@/components/art/diagrams";

export default function Home() {
  return (
    <>
      <PageHero
        title="Onchain asset management that keeps its own rules"
        lead="Written risk limits, automated monitoring and policy-bound execution, so capital on Robinhood Chain is managed the same way on a quiet day and a loud one."
        aside={
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <img src="/art/hero-globe.webp" alt="" className="float-slow size-full rounded-full object-cover" />
          </div>
        }
      >
        <Reveal delay={200}>
          <div className="mt-14 flex items-center gap-4">
            <Mark className="size-12 shrink-0 text-ink" />
            <div>
              <p className="h-number text-[30px] leading-none sm:text-[39px]">
                #<LiveBlock />
              </p>
              <p className="mt-1 text-[14px] font-medium text-body">Robinhood Chain block, read live</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/app" className="btn">
              Launch app
            </Link>
            <Link href="/docs" className="btn btn-light">
              Read the docs
            </Link>
          </div>
        </Reveal>
      </PageHero>

      <Section>
        <SectionHead title="Built on open standards, not borrowed logos" />
        <StandardsStrip />
      </Section>

      <Section>
        <SectionHead title="Three ways to put capital to work under written rules" />
        <ProductCards />
      </Section>

      <section className="wrap grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-2">
        <Reveal>
          <img src="/art/orbit.webp" alt="" className="aspect-[16/9] w-full rounded-xl object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={80}>
          <p className="text-center text-[24px] leading-[1.3] tracking-tight text-ink sm:text-[32px]">
            Every position watched around the clock, every response decided before it is needed.
          </p>
        </Reveal>
      </section>

      <Section>
        <SectionHead title="Yield building blocks that run on their own or inside your product" />
        <Accordion
          first={0}
          items={[
            {
              title: "Wallets and apps",
              lead: "Offer a savings balance without hiring a risk desk",
              text: "Route user deposits into an Atlas vault and show the share balance like any other token. Limits, monitoring and exits come with the vault.",
              cta: { label: "Talk to us", href: "/contact?topic=Integration" },
            },
            {
              title: "Protocols and integrators",
              lead: "Compose with shares that are plain tokens",
              text: "Fund and vault shares follow common token interfaces, so they can be listed as collateral, paired in pools or held by other contracts.",
              cta: { label: "Read the docs", href: "/docs/funds" },
            },
            {
              title: "Treasuries and allocators",
              lead: "Keep custody, delegate the discipline",
              text: "Your reserves stay in your own account. We execute inside permissions that encode the investment policy you approve, and report every month.",
              cta: { label: "Start a mandate", href: "/treasuries" },
            },
          ]}
        />
      </Section>

      <PostGrid />
    </>
  );
}
