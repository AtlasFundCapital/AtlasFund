import { sampleSeries } from "@/content/products";

/* Charts drawn as plain SVG from deterministic sample series. Every chart that
   is not fed by live data carries a visible "illustrative" label. */

type Series = { key: string; label: string; color: string; tint: string; values: number[] };

const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

export function sampleVaultSeries(): Series[] {
  const n = 120;
  const a = sampleSeries(7, n, 0.4, 0.2, 1.4);
  const b = sampleSeries(21, n, 0.2, 0.16, 1.1);
  const c = sampleSeries(42, n, 0, 0.05, 0.5);
  return [
    { key: "anchor-usd", label: "Anchor USD", color: "#2b6fd6", tint: "bg-sky-3 text-sky", values: a },
    { key: "summit-usd", label: "Summit USD", color: "#b3406f", tint: "bg-rose-3 text-rose", values: b },
    { key: "anchor-eth", label: "Anchor ETH", color: "#3f7a55", tint: "bg-sage-3 text-sage", values: c },
  ];
}

const money = (m: number) => (m >= 1 ? `$${m.toFixed(2)}m` : `$${(m * 1000).toFixed(0)}k`);

export function DepositsChart({ series = sampleVaultSeries() }: { series?: Series[] }) {
  const n = series[0].values.length;
  const total = Array.from({ length: n }, (_, i) => series.reduce((s, x) => s + x.values[i], 0));
  const max = Math.ceil(Math.max(...total) / 10) * 10 || 10;
  const W = 1000;
  const H = 300;
  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => H - (v / max) * H;
  const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const last = total[n - 1];
  return (
    <div className="card dots overflow-hidden border border-ink/10 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label">Total deposits</p>
        <span className="inline-flex items-center rounded-full border border-brass/40 bg-brass-3/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brass">
          Illustrative, not live
        </span>
      </div>
      <p className="h-number mt-3 text-[40px] leading-none sm:text-[48px]">{money(last)}</p>
      <p className="mt-2 text-[12px] text-mute">Across Anchor and Summit vaults · simulated path used to preview the dashboard</p>
      <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-[200px] w-full sm:h-[260px]" role="img" aria-label="Illustrative deposits chart">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#1f1f1f" strokeOpacity="0.08" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={`${line(total)} L${W} ${H} L0 ${H} Z`} fill="#1f1f1f" fillOpacity="0.06" />
          <path d={line(total)} fill="none" stroke="#6e6d69" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          {series.map((s) => (
            <path key={s.key} d={line(s.values)} fill="none" stroke={s.color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="flex h-[200px] flex-col justify-between text-right font-mono text-[10px] text-mute sm:h-[260px]">
          {[max, max * 0.75, max * 0.5, max * 0.25, 0].map((v) => (
            <span key={v}>${v.toFixed(0)}m</span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between pr-8 font-mono text-[10px] text-mute">
        {MONTHS.filter((_, i) => i % 2 === 0).map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border border-ink/10 bg-paper-2/70 px-3 py-2.5 text-[13px]">
          <span className="text-mute">Total</span>
          <b className="font-medium text-ink">{money(last)}</b>
        </div>
        {series.map((s) => (
          <div key={s.key} className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] ${s.tint}`}>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>
            <b className="font-medium">{money(s.values[n - 1])}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Small sparkline for detail pages. */
export function Spark({ seed, color = "#1f1f1f", className = "" }: { seed: number; color?: string; className?: string }) {
  const v = sampleSeries(seed, 60, 5, 0.05, 0.6);
  const max = Math.max(...v);
  const min = Math.min(...v);
  const d = v.map((p, i) => `${i ? "L" : "M"}${(i / 59) * 300} ${100 - ((p - min) / (max - min || 1)) * 90 - 5}`).join(" ");
  return (
    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={`${d} L300 100 L0 100 Z`} fill={color} fillOpacity="0.07" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Horizontal share bar with a legend, used for allocations. */
export function ShareBar({ parts }: { parts: { label: string; share: number }[] }) {
  const shades = ["#1f1f1f", "#55534f", "#8a8884", "#b9b7b2", "#d9d7d2"];
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full">
        {parts.map((p, i) => (
          <span key={p.label} style={{ width: `${p.share}%`, background: shades[i % shades.length] }} />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {parts.map((p, i) => (
          <li key={p.label} className="flex items-center justify-between gap-3 text-[13px]">
            <span className="flex items-center gap-2 text-body">
              <span className="size-2.5 rounded-sm" style={{ background: shades[i % shades.length] }} />
              {p.label}
            </span>
            <span className="font-mono text-ink">{p.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dark treemap panel: sample split of assets across mandates. */
export function Treemap({ items }: { items: { label: string; share: number }[] }) {
  // Simple slice-and-dice: first half across, rest stacked.
  const total = items.reduce((s, i) => s + i.share, 0);
  const shades = ["#3a3a38", "#4a4946", "#5b5a56", "#6b6a66", "#7c7a76", "#8d8b86"];
  let xAcc = 0;
  return (
    <div className="relative h-[260px] overflow-hidden rounded-xl bg-ink p-2 sm:h-[300px]">
      <div className="relative size-full">
        {items.map((it, i) => {
          const w = (it.share / total) * 100;
          const left = xAcc;
          xAcc += w;
          return (
            <div
              key={it.label}
              className="absolute top-0 flex h-full flex-col justify-end rounded-md p-3 text-[12px] text-white/90"
              style={{ left: `calc(${left}% + 2px)`, width: `calc(${w}% - 4px)`, background: shades[i % shades.length] }}
            >
              <span className="truncate font-medium">{it.label}</span>
              <span className="font-mono text-white/60">{it.share}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
