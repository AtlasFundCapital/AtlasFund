"use client";

import { useSyncExternalStore } from "react";
import { CHAIN } from "@/config/brand";

/*
 * Live Robinhood Chain facts, read through this site's /api/rpc relay, plus an
 * ETH/USD quote from /api/price. One shared poller feeds every component.
 */

export type Facts = {
  block: number | null;
  gasGwei: number | null;
  /** Seconds between the latest block and the one 50 blocks earlier, averaged. */
  blockTime: number | null;
  ethUsd: number | null;
  ethChange: number | null;
  priceSource: string | null;
  ok: boolean | null;
};

const EMPTY: Facts = { block: null, gasGwei: null, blockTime: null, ethUsd: null, ethChange: null, priceSource: null, ok: null };
let facts: Facts = EMPTY;
const listeners = new Set<() => void>();
let timer: number | null = null;
let tick = 0;

async function readChain() {
  const res = await fetch("/api/rpc", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify([
      { jsonrpc: "2.0", id: 0, method: "eth_blockNumber", params: [] },
      { jsonrpc: "2.0", id: 1, method: "eth_gasPrice", params: [] },
    ]),
    cache: "no-store",
  });
  const body = (await res.json()) as { result?: string }[];
  if (!res.ok || !Array.isArray(body) || !body[0]?.result) throw new Error("rpc");
  const block = Number(BigInt(body[0].result));
  const gasGwei = body[1]?.result ? Number(BigInt(body[1].result)) / 1e9 : null;
  let blockTime = facts.blockTime;
  // Block time is slow to change; refresh it every tenth poll.
  if (blockTime === null || tick % 10 === 0) {
    try {
      const r = await fetch("/api/rpc", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify([
          { jsonrpc: "2.0", id: 0, method: "eth_getBlockByNumber", params: [`0x${block.toString(16)}`, false] },
          { jsonrpc: "2.0", id: 1, method: "eth_getBlockByNumber", params: [`0x${(block - 50).toString(16)}`, false] },
        ]),
        cache: "no-store",
      });
      const blocks = (await r.json()) as { result?: { timestamp: string } }[];
      const a = blocks[0]?.result?.timestamp;
      const b = blocks[1]?.result?.timestamp;
      if (a && b) blockTime = (Number(BigInt(a)) - Number(BigInt(b))) / 50;
    } catch {
      // Keep the previous value.
    }
  }
  return { block, gasGwei, blockTime };
}

async function readPrice() {
  const res = await fetch("/api/price", { cache: "no-store" });
  const body = (await res.json()) as { usd?: number; change24h?: number | null; source?: string };
  if (!res.ok || !body.usd) throw new Error("price");
  return { ethUsd: body.usd, ethChange: body.change24h ?? null, priceSource: body.source ?? null };
}

async function poll() {
  const [chain, price] = await Promise.allSettled([readChain(), tick % 5 === 0 || facts.ethUsd === null ? readPrice() : Promise.reject(new Error("skip"))]);
  tick++;
  facts = {
    ...facts,
    ...(chain.status === "fulfilled" ? chain.value : {}),
    ...(price.status === "fulfilled" ? price.value : {}),
    ok: chain.status === "fulfilled",
  };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (timer === null) {
    poll();
    timer = window.setInterval(poll, 6000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };
}

export function useChainFacts() {
  return useSyncExternalStore(subscribe, () => facts, () => EMPTY);
}

export function useBlockNumber() {
  return useChainFacts().block;
}

export const fmtGas = (g: number | null) => (g === null ? "…" : `${g < 0.01 ? g.toFixed(4) : g.toFixed(3)} gwei`);
export const fmtUsd = (v: number | null, digits = 2) =>
  v === null ? "…" : `$${v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

/** Big live number for hero sections: the current block height. */
export function LiveBlock() {
  const { block, ok } = useChainFacts();
  return (
    <span className="tabular-nums">{block ? block.toLocaleString("en-US") : ok === false ? "offline" : "…"}</span>
  );
}

/** Thin strip of live chain numbers with a pulsing dot. */
export function LiveChainStrip({ className = "" }: { className?: string }) {
  const { block, gasGwei, ethUsd, ok } = useChainFacts();
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-body ${className}`}>
      <span className="flex items-center gap-2 font-medium text-ink">
        <span key={block ?? 0} className={`pulse-once size-2 rounded-full ${ok === false ? "bg-amber-500" : "bg-sage"}`} />
        {CHAIN.name} · live
      </span>
      <span>
        Block <b className="font-medium tabular-nums text-ink">{block ? `#${block.toLocaleString("en-US")}` : "…"}</b>
      </span>
      <span>
        Gas <b className="font-medium tabular-nums text-ink">{fmtGas(gasGwei)}</b>
      </span>
      <span>
        ETH <b className="font-medium tabular-nums text-ink">{fmtUsd(ethUsd)}</b>
      </span>
      {ok === false && <span className="text-mute">Chain unreachable right now, retrying.</span>}
    </div>
  );
}
