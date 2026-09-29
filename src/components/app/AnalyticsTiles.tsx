"use client";

import { CHAIN } from "@/config/brand";
import { fmtGas, fmtUsd, useChainFacts } from "@/components/LiveChain";

export function AnalyticsTiles() {
  const { block, gasGwei, blockTime, ethUsd, ethChange, priceSource, ok } = useChainFacts();
  const tiles = [
    { label: "Latest block", value: block ? `#${block.toLocaleString("en-US")}` : ok === false ? "offline" : "…", sub: CHAIN.name },
    { label: "Average block time", value: blockTime ? `${blockTime.toFixed(2)} s` : "…", sub: "Over the last 50 blocks" },
    { label: "Gas price", value: fmtGas(gasGwei), sub: "eth_gasPrice" },
    { label: "ETH / USD", value: fmtUsd(ethUsd), sub: ethChange !== null ? `${ethChange >= 0 ? "+" : ""}${ethChange.toFixed(2)}% 24h · ${priceSource}` : "Public price feed" },
  ];
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className="card p-5">
          <p className="flex items-center gap-2 text-[13px] text-body">
            <span className={`size-1.5 rounded-full ${ok === false ? "bg-amber-500" : "bg-sage"}`} />
            {t.label}
          </p>
          <p className="h-number mt-2 truncate text-[28px] leading-tight">{t.value}</p>
          <p className="mt-1 truncate text-[12px] text-mute">{t.sub}</p>
        </div>
      ))}
    </div>
  );
}
