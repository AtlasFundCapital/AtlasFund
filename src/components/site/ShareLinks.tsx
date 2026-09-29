"use client";

import { useState } from "react";
import { BRAND } from "@/config/brand";
import { CheckIcon, LinkIcon, XIcon } from "@/components/icons";

export function ShareLinks({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${BRAND.url}${path}`;
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
        className="grid size-9 place-items-center rounded-lg bg-card text-ink hover:bg-card-2"
      >
        <XIcon className="size-4" />
      </a>
      <button
        type="button"
        aria-label="Copy link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          } catch {}
        }}
        className="grid size-9 place-items-center rounded-lg bg-card text-ink hover:bg-card-2"
      >
        {copied ? <CheckIcon className="size-4 text-sage" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  );
}
