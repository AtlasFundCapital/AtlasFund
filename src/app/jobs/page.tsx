import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero, Section, SectionHead, TitleCards } from "@/components/site/blocks";
import { ArrowUpRight, CheckIcon } from "@/components/icons";
import { BENEFITS, JOBS, VALUES } from "@/content/company";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Open roles at Atlas Fund: contracts, risk, automation and treasury operations on Robinhood Chain.",
};

export default function JobsPage() {
  return (
    <>
      <PageHero
        title="Build the machinery behind rule-bound capital"
        lead="We are a small remote team writing contracts, risk limits and agents that hold other people's money to a standard. The work is careful, public and shipped onchain."
        actions={
          <Link href="#positions" className="btn">
            See open roles
          </Link>
        }
        aside={<img src="/art/people.webp" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />}
      />

      <Section>
        <SectionHead title="What we value" />
        <TitleCards cols={4} items={VALUES} />
      </Section>

      <Section>
        <SectionHead title="Benefits" />
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <li key={b} className="card flex items-center gap-3 p-4 text-[14px] text-ink">
              <CheckIcon className="size-4 shrink-0 text-sage" /> {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div id="positions" className="scroll-mt-24" />
        <SectionHead title="Open positions" />
        <div className="space-y-2">
          {JOBS.map((j, i) => (
            <Reveal key={j.slug} delay={i * 40}>
              <Link href={`/jobs/${j.slug}`} className="card grid grid-cols-[1fr_auto] items-center gap-4 p-5 transition-colors hover:bg-card-2 md:grid-cols-[2fr_1fr_1fr_auto]">
                <span className="text-[18px] tracking-tight text-ink">{j.title}</span>
                <span className="hidden text-[14px] text-body md:block">{j.team}</span>
                <span className="hidden text-[14px] text-body md:block">{j.location}</span>
                <span className="btn btn-sm">
                  View <ArrowUpRight className="size-3.5" />
                </span>
                <span className="col-span-2 -mt-2 text-[13px] text-mute md:hidden">
                  {j.team} · {j.location}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="How we hire" />
        <TitleCards
          items={[
            { title: "1. Conversation", text: "Thirty minutes about what you want to work on and what we need. No trick questions." },
            { title: "2. Paid exercise", text: "A small, realistic task from our backlog, paid at a fair rate, reviewed together." },
            { title: "3. Team day", text: "Meet the people you would work with most, then we decide quickly and tell you why." },
          ]}
        />
      </Section>
    </>
  );
}
