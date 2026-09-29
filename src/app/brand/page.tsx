import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Logo";
import { Section, SectionHead, TitleCards } from "@/components/site/blocks";
import { DownloadIcon, FundMark, TreasuryMark, VaultMark } from "@/components/icons";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Brand kit",
  description: "Atlas Fund logos, colours, type and illustration style.",
};

const COLORS = [
  { group: "Neutral", items: [{ name: "Ink", hex: "1F1F1F", dark: true }, { name: "Stone", hex: "DEDDDB" }, { name: "Paper", hex: "E8E7E5" }, { name: "Card", hex: "EEEDEC" }] },
  { group: "Anchor tier", items: [{ name: "Brass 800", hex: "8A6B2E", dark: true }, { name: "Brass 400", hex: "C2A466" }, { name: "Brass 200", hex: "E2D2AC" }] },
  { group: "Signals", items: [{ name: "Sky", hex: "2B6FD6", dark: true }, { name: "Sage", hex: "3F7A55", dark: true }, { name: "Rose", hex: "B3406F", dark: true }] },
];

const ART = ["globe", "cube", "vault", "stack", "shield", "orbit"];

export default function BrandPage() {
  return (
    <>
      <section className="wrap pb-6 pt-10 md:pt-16">
        <Reveal>
          <h1 className="h-display">Brand kit</h1>
          <p className="mt-4 text-[16px] text-body">Logos, colours, type and the rules for using them.</p>
          <a href="/brand/atlas-mark.svg" download className="btn mt-8">
            <DownloadIcon className="size-4" /> Download the mark
          </a>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 max-w-[760px] space-y-4 text-[15px] leading-relaxed text-body">
            <p>{BRAND.name} is a non-custodial onchain asset manager on Robinhood Chain. It runs tokenised funds, automated lending vaults and treasury mandates, all bound by rules written before capital moves.</p>
            <p>When describing us, say what we do and how: written policies, automated enforcement, public verification. Avoid promises about returns; we make none.</p>
          </div>
        </Reveal>
      </section>

      <Section>
        <SectionHead title="Logos" />
        <p className="-mt-4 mb-6 text-[14px] text-body">Use the full lockup wherever there is room. The tile alone is for avatars and small spaces.</p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="card flex aspect-[16/10] flex-col items-center justify-center gap-3 p-6">
            <span className="flex items-center gap-3 text-ink">
              <Mark className="size-12" />
              <span className="font-display text-[30px] tracking-[-0.06em]">Atlas Fund</span>
            </span>
            <p className="text-[12px] text-mute">Main lockup</p>
          </div>
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-lg bg-ink p-6">
            <span className="flex items-center gap-3 text-paper">
              <Mark className="size-12" ink="#e8e7e5" paper="#1f1f1f" />
              <span className="font-display text-[30px] tracking-[-0.06em]">Atlas Fund</span>
            </span>
            <p className="text-[12px] text-paper/60">Reversed</p>
          </div>
          <div className="card flex aspect-[16/10] flex-col items-center justify-center gap-3 p-6">
            <img src="/brand/atlas-icon.webp" alt="Atlas Fund tile" className="size-20" />
            <a href="/brand/atlas-icon.webp" download className="text-[12px] text-ink underline">
              Tile, 512 px
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title="Product marks" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            { name: "Vaults", Icon: VaultMark },
            { name: "Funds", Icon: FundMark },
            { name: "Treasuries", Icon: TreasuryMark },
          ].map(({ name, Icon }) => (
            <div key={name} className="card flex items-center gap-3 p-6">
              <Icon className="size-10 text-ink" />
              <span className="text-[28px] tracking-tight text-ink">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Colours" />
        <p className="-mt-4 mb-6 max-w-[720px] text-[14px] text-body">Neutrals carry almost everything. Brass marks the Anchor tier and highlights; signal colours are for charts only.</p>
        <div className="space-y-6">
          {COLORS.map((g) => (
            <div key={g.group}>
              <p className="mb-2 text-[13px] text-body">{g.group}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {g.items.map((c) => (
                  <div key={c.hex} className="flex aspect-[4/3] flex-col justify-end rounded-lg border border-ink/10 p-3" style={{ background: `#${c.hex}`, color: c.dark ? "#fff" : "#1f1f1f" }}>
                    <p className="text-[13px] font-medium">{c.name}</p>
                    <p className="font-mono text-[12px] opacity-75">#{c.hex}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Typography" />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="card p-6">
            <p className="text-[12px] text-mute">Display</p>
            <p className="mt-3 font-display text-[64px] leading-none text-ink">Aa</p>
            <p className="mt-3 text-[14px] text-ink">Lexend Exa</p>
          </div>
          <div className="card p-6">
            <p className="text-[12px] text-mute">Text</p>
            <p className="mt-3 text-[64px] leading-none text-ink">Aa</p>
            <p className="mt-3 text-[14px] text-ink">Lexend</p>
          </div>
          <div className="card p-6">
            <p className="text-[12px] text-mute">Data</p>
            <p className="mt-3 font-mono text-[64px] leading-none text-ink">Aa</p>
            <p className="mt-3 text-[14px] text-ink">Fragment Mono</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title="Illustrations" />
        <p className="-mt-4 mb-6 max-w-[720px] text-[14px] text-body">Simple shaded objects sampled on a grid and redrawn as dots. Dot size follows darkness; the faint grid always shows through.</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {ART.map((a) => (
            <img key={a} src={`/art/${a}.webp`} alt="" loading="lazy" className="aspect-[16/9] w-full rounded-lg object-cover" />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Philosophy" />
        <TitleCards
          cols={4}
          items={[
            { title: "Discipline", sub: "Rules before positions", text: "Nothing moves unless a written rule allows it, and the rule is the same on good days and bad ones." },
            { title: "Automation", sub: "Fast, but fenced", text: "Machines respond in seconds, inside permissions that no machine can widen." },
            { title: "Transparency", sub: "Check, do not trust", text: "Every figure we publish points to the chain state that proves it." },
            { title: "Restraint", sub: "Less, done properly", text: "A short product list, small caps at the start, and plain language throughout." },
          ]}
        />
      </Section>
    </>
  );
}
