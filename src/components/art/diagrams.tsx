import { Reveal } from "@/components/Reveal";

/* Diagrams built from boxes, drawn for this site. */

function Node({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="rounded-lg bg-card-2 px-4 py-4 text-center shadow-[0_1px_0_rgb(0_0_0/0.04)]">
      <p className="text-[14px] font-medium text-ink">{title}</p>
      {sub && <p className="mt-0.5 text-[12px] text-body">{sub}</p>}
    </div>
  );
}

function Dots({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-1 ${vertical ? "flex-col py-1" : "px-1"}`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-ink/60" />
      ))}
    </div>
  );
}

/** How a fund share is minted, priced and redeemed. */
export function FundArchitecture() {
  return (
    <Reveal>
      <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-medium text-ink">Pricing contract</p>
            <span className="pill">Any block</span>
          </div>
          <Node title="Balance reader" sub="Positions held by the fund" />
          <Dots vertical />
          <Node title="Price oracles" sub="Staleness and deviation checked" />
        </div>
        <Dots />
        <div className="space-y-3">
          <div className="rounded-lg bg-ink px-4 py-5 text-center text-[14px] font-medium text-white">Subscribe: mint at NAV</div>
          <div className="rounded-lg bg-ink px-4 py-5 text-center text-[14px] font-medium text-white">Redeem: burn for a pro-rata slice</div>
        </div>
        <Dots />
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-medium text-ink">Share token</p>
            <span className="pill">Robinhood Chain</span>
          </div>
          <Node title="Share contract" sub="Standard token, freely composable" />
          <Dots vertical />
          <Node title="Policy-bound account" sub="Holds the fund's positions" />
        </div>
      </div>
    </Reveal>
  );
}

/** Monitoring → logic → execution loop used on the vaults page. */
export function AgentLoop() {
  const steps = [
    { n: "01", title: "Monitor", text: "Utilisation, liquidity, rates and oracle health are read for every market a vault touches, all the time." },
    { n: "02", title: "Decide", text: "Each reading is compared with the vault's written thresholds. Only a crossed threshold produces an action." },
    { n: "03", title: "Act", text: "An agent submits the permitted response: rebalance, pause deposits, or withdraw. Nothing outside the policy can be signed." },
  ];
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 70} className="h-full">
          <div className="card relative h-full overflow-hidden p-6">
            <p className="font-mono text-[12px] text-mute">{s.n}</p>
            <p className="mt-6 text-[26px] tracking-tight text-ink">{s.title}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-body">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/*
 * Replaces a client-logo wall. These are the network and open standards Atlas
 * Fund builds on; none of them is a client, partner or endorser.
 */
const STANDARDS: { name: string; note: string; mark: React.ReactNode }[] = [
  { name: "Robinhood Chain", note: "Settlement network", mark: <path d="M4 20 L12 4 L20 20 Z" /> },
  { name: "ERC-20", note: "Share tokens", mark: <circle cx="12" cy="12" r="8" /> },
  { name: "ERC-4626", note: "Vault interface", mark: <rect x="4" y="4" width="16" height="16" rx="4" /> },
  { name: "EIP-6963", note: "Wallet discovery", mark: <path d="M4 7h16v10H4z M15 10h5v4h-5z" /> },
  { name: "EIP-712", note: "Typed signatures", mark: <path d="M5 5h14v4H5z M5 11h14v8H5z" /> },
  { name: "Onchain oracles", note: "Price inputs", mark: <path d="M12 3a9 9 0 1 1 0 18a9 9 0 0 1 0-18Z M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z" /> },
  { name: "Multisig accounts", note: "Policy custody", mark: <path d="M3 6h7v5H3z M14 6h7v5h-7z M8.5 14h7v5h-7z" /> },
  { name: "Open explorers", note: "Public verification", mark: <path d="M10 3a7 7 0 1 1 0 14a7 7 0 0 1 0-14Z M10 6a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z M15 16.5 L16.5 15 L21 19.5 L19.5 21 Z" /> },
];

export function StandardsStrip() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
        {STANDARDS.map((s, i) => (
          <Reveal key={s.name} delay={i * 40}>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="size-7 shrink-0 text-ink" fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="0" aria-hidden="true">
                {s.mark}
              </svg>
              <span className="min-w-0">
                <span className="block truncate text-[16px] font-medium tracking-tight text-ink sm:text-[18px]">{s.name}</span>
                <span className="block truncate text-[12px] text-mute">{s.note}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-[12px] text-mute">Open standards and infrastructure we build on. Listed for transparency; none of them is a client, partner or endorser.</p>
    </div>
  );
}
