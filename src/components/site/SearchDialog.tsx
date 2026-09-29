"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ARTICLES, categoryLabel } from "@/content/articles";
import { DOCS } from "@/content/docs";
import { FUNDS, VAULTS } from "@/content/products";
import { JOBS } from "@/content/company";
import { NAV } from "@/config/nav";
import { CloseIcon, SearchIcon } from "@/components/icons";

type Entry = { title: string; href: string; kind: string; text: string };

const INDEX: Entry[] = [
  ...NAV.flatMap((g) => g.items.map((i) => ({ title: i.label, href: i.href, kind: "Page", text: i.hint ?? "" }))),
  { title: "App", href: "/app", kind: "Page", text: "Connect wallet, balances, products" },
  { title: "Terms of Service", href: "/terms-of-service", kind: "Page", text: "legal terms" },
  { title: "Privacy Policy", href: "/privacy-policy", kind: "Page", text: "privacy data" },
  ...FUNDS.map((f) => ({ title: f.name, href: `/funds/${f.slug}`, kind: "Fund", text: f.summary })),
  ...VAULTS.map((v) => ({ title: v.name, href: `/vaults/${v.slug}`, kind: "Vault", text: v.summary })),
  ...ARTICLES.map((a) => ({ title: a.title, href: `/blog/${a.slug}`, kind: categoryLabel(a.category), text: a.subtitle })),
  ...DOCS.map((d) => ({ title: `Docs: ${d.title}`, href: `/docs/${d.slug}`, kind: "Docs", text: d.lead })),
  ...JOBS.map((j) => ({ title: j.title, href: `/jobs/${j.slug}`, kind: "Job", text: j.summary })),
];

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return INDEX.slice(0, 8);
    return INDEX.filter((e) => `${e.title} ${e.text} ${e.kind}`.toLowerCase().includes(term)).slice(0, 12);
  }, [q]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 p-4 pt-[10vh]" onMouseDown={onClose} role="presentation">
      <div role="dialog" aria-modal="true" aria-label="Search" onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-[560px] overflow-hidden rounded-xl bg-card-2 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-ink/10 px-4">
          <SearchIcon className="size-5 shrink-0 text-mute" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, products and articles"
            className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-mute"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-mute hover:text-ink">
            <CloseIcon className="size-5" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {results.map((r) => (
            <li key={r.href}>
              <Link href={r.href} onClick={onClose} className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 hover:bg-card">
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium text-ink">{r.title}</span>
                  <span className="block truncate text-[12px] text-mute">{r.text}</span>
                </span>
                <span className="pill shrink-0">{r.kind}</span>
              </Link>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center text-[14px] text-mute">Nothing matches “{q}”.</li>}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
