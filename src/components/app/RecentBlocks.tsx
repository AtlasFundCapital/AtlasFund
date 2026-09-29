"use client";

import { useEffect, useState } from "react";
import { CHAIN } from "@/config/brand";
import { useBlockNumber } from "@/components/LiveChain";
import { rpc } from "@/lib/rpc";

type Row = { number: number; time: number; txs: number; gasUsed: number; gasLimit: number };

/** The latest blocks, read live through the relay each time the head moves. */
export function RecentBlocks({ count = 8 }: { count?: number }) {
  const head = useBlockNumber();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!head) return;
    let cancelled = false;
    Promise.all(
      Array.from({ length: count }, (_, i) =>
        rpc<{ number: string; timestamp: string; transactions: string[]; gasUsed: string; gasLimit: string }>("eth_getBlockByNumber", [`0x${(head - i).toString(16)}`, false]),
      ),
    )
      .then((blocks) => {
        if (cancelled) return;
        setRows(
          blocks.filter(Boolean).map((b) => ({
            number: Number(BigInt(b.number)),
            time: Number(BigInt(b.timestamp)),
            txs: b.transactions.length,
            gasUsed: Number(BigInt(b.gasUsed)),
            gasLimit: Number(BigInt(b.gasLimit)),
          })),
        );
        setFailed(false);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [head, count]);

  return (
    <div className="card overflow-hidden">
      <div className="hidden grid-cols-[1.2fr_1fr_0.7fr_1.4fr] gap-4 border-b border-ink/10 px-5 py-3 text-[12px] text-mute sm:grid">
        <span>Block</span>
        <span>Time (UTC)</span>
        <span>Transactions</span>
        <span>Gas used</span>
      </div>
      {!rows && <p className="px-5 py-6 text-[14px] text-mute">{failed ? "The chain could not be reached. Retrying on the next block." : "Reading the latest blocks…"}</p>}
      {rows?.map((r) => (
        <a
          key={r.number}
          href={`${CHAIN.explorer}/block/${r.number}`}
          target="_blank"
          rel="noreferrer"
          className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-ink/5 px-5 py-3 text-[13px] last:border-0 hover:bg-card-2 sm:grid-cols-[1.2fr_1fr_0.7fr_1.4fr]"
        >
          <span className="font-mono text-ink">#{r.number.toLocaleString("en-US")}</span>
          <span className="font-mono text-body">{new Date(r.time * 1000).toISOString().slice(11, 19)}</span>
          <span className="font-mono text-body">{r.txs} tx</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
              <span className="block h-full bg-ink" style={{ width: `${Math.min(100, (r.gasUsed / (r.gasLimit || 1)) * 100)}%` }} />
            </span>
            <span className="w-14 text-right font-mono text-[11px] text-mute">{((r.gasUsed / (r.gasLimit || 1)) * 100).toFixed(2)}%</span>
          </span>
        </a>
      ))}
    </div>
  );
}
