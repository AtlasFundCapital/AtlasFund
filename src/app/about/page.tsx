import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, PostGrid, Section, SectionHead, TitleCards } from "@/components/site/blocks";
import { PRINCIPLES, ROLES, TIMELINE } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description: "Atlas Fund is a non-custodial onchain asset manager on Robinhood Chain, built around written rules, automation and public verification.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Non-custodial asset management, built on Robinhood Chain"
        lead="Atlas Fund runs funds, vaults and treasury mandates where every rule is written down first and every action can be checked on the explorer afterwards."
        actions={
          <Link href="/contact" className="btn">
            Speak with us
          </Link>
        }
        aside={<img src="/art/seal.webp" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />}
      />

      <Section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <p className="text-[22px] leading-[1.35] tracking-tight text-ink sm:text-[26px]">Atlas Fund started from a simple complaint: onchain capital is often managed by habit rather than by policy.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-4 text-[15px] leading-relaxed text-body">
              <p>Teams hold reserves in a single wallet, move them when someone has time, and explain afterwards. Depositors in yield products learn the rules only when something breaks. We think both deserve better, and that the chain already has the tools to provide it.</p>
              <p>Our operating model is fixed from day one. We never take custody. We act through narrow permissions on accounts that belong to a fund, a vault or a client. Every limit is written before capital moves, and every position is public.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead title="Timeline" />
        <div className="space-y-2">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 50}>
              <div className="card grid grid-cols-1 gap-3 p-5 sm:p-6 md:grid-cols-[300px_1fr] md:items-center">
                <div>
                  <p className="text-[30px] leading-none tracking-tight text-ink">{t.year}</p>
                  <p className="mt-2 flex items-center gap-2 text-[14px] font-medium text-ink">
                    {t.label}
                    <span className={`pill ${t.done ? "bg-sage-3 text-sage" : ""}`}>{t.done ? "Done" : "Next"}</span>
                  </p>
                </div>
                <p className="max-w-[560px] text-[14px] leading-relaxed text-body">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="How the team is organised" />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {ROLES.map((r, i) => (
            <Reveal key={r.role} delay={i * 60} className="h-full">
              <div className="card h-full p-6">
                <span className="grid size-14 place-items-center rounded-xl bg-ink font-display text-[22px] text-paper">{r.glyph}</span>
                <p className="mt-6 text-[22px] tracking-tight text-ink">{r.role}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-body">{r.scope}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-mute">We describe seats and responsibilities rather than publishing personal profiles.</p>
      </Section>

      <Section>
        <SectionHead title="What we commit to" />
        <TitleCards cols={4} items={PRINCIPLES} />
      </Section>

      <PostGrid title="Learn more about how we work" />
    </>
  );
}
