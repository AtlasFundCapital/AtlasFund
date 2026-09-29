"use client";

import { useState } from "react";
import { BRAND, TOKEN, explorerToken, shortAddress } from "@/config/brand";
import { CheckIcon, CopyIcon, GithubIcon, XIcon } from "@/components/icons";

/**
 * Copies the $ATLAS contract address. While `BRAND.ca` is not a valid 0x
 * address the controls stay calm and disabled; setting a real address in
 * src/config/brand.ts turns them into working copy buttons.
 */
function useCopyCa() {
  const [copied, setCopied] = useState(false);
  const live = TOKEN.isLive;
  const copy = async () => {
    if (!live) return;
    try {
      await navigator.clipboard.writeText(BRAND.ca);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the address stays visible to select by hand.
    }
  };
  return { live, copied, copy };
}

/** Compact pill for the navbar and the mobile menu. */
export function CopyCaPill({ className = "" }: { className?: string }) {
  const { live, copied, copy } = useCopyCa();
  return (
    <button
      type="button"
      onClick={copy}
      disabled={!live}
      title={live ? `Copy ${BRAND.symbol} contract address` : `${BRAND.symbol} contract address is published at launch`}
      aria-label={live ? `Copy ${BRAND.symbol} contract address` : `${BRAND.symbol} contract address coming soon`}
      className={`inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-card-2/70 px-3 py-[7px] text-[12px] text-ink transition-colors hover:border-ink/40 disabled:cursor-default disabled:hover:border-ink/15 ${className}`}
    >
      <span className="font-mono text-[11px] font-medium tracking-wider text-brass">CA</span>
      <span className="font-mono">{live ? (copied ? "Copied" : shortAddress(BRAND.ca, 5, 4)) : "soon"}</span>
      {live && (copied ? <CheckIcon className="size-3.5 text-sage" /> : <CopyIcon className="size-3.5" />)}
    </button>
  );
}

/** Token block for the footer, shown at every screen size. */
export function CaBlock() {
  const { live, copied, copy } = useCopyCa();
  return (
    <div className="w-full max-w-[360px]">
      <p className="text-[14px] font-medium text-ink">{BRAND.symbol} contract</p>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-ink/10 bg-card-2 p-1.5 pl-3">
        <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink">{live ? shortAddress(BRAND.ca, 10, 8) : "Contract address: soon"}</span>
        <button
          type="button"
          onClick={copy}
          disabled={!live}
          aria-label={live ? "Copy contract address" : "Contract address coming soon"}
          className="grid size-8 shrink-0 place-items-center rounded-md bg-ink text-white transition-colors hover:bg-black disabled:bg-ink/25"
        >
          {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
        </button>
      </div>
      <p className="mt-2 text-[12px] text-mute">
        {live ? "Robinhood Chain · click to copy" : "Robinhood Chain · published here on launch day"}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-ink">
        {live && (
          <a href={explorerToken(BRAND.ca)} target="_blank" rel="noreferrer" className="hover:underline">
            View on explorer
          </a>
        )}
        <a href={BRAND.x} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
          <XIcon className="size-3.5" /> {BRAND.xHandle}
        </a>
        {BRAND.github && (
          <a href={BRAND.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
            <GithubIcon className="size-3.5" /> GitHub
          </a>
        )}
      </div>
    </div>
  );
}
