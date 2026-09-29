import type { Metadata } from "next";
import { AnalyticsTiles } from "@/components/app/AnalyticsTiles";
import { RecentBlocks } from "@/components/app/RecentBlocks";
import { Section, SectionHead } from "@/components/site/blocks";
import { CHAIN } from "@/config/brand";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Live Robinhood Chain readings: latest blocks, block time, gas price and ETH price.",
};

export default function AnalyticsPage() {
  return (
    <>
      <section className="wrap pb-4 pt-10 md:pt-16">
        <h1 className="h-display">Analytics</h1>
        <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-body">
          Live readings from {CHAIN.name}, fetched through this site&apos;s read-only relay. Product dashboards join this page when the contracts are deployed.
        </p>
      </section>
      <Section>
        <AnalyticsTiles />
      </Section>
      <Section className="pt-0">
        <SectionHead title="Latest blocks" action={{ label: "Open explorer", href: CHAIN.explorer }} />
        <RecentBlocks />
      </Section>
    </>
  );
}
