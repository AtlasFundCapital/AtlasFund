import Link from "next/link";
import type { ReactNode } from "react";
import { DOCS } from "@/content/docs";
import type { Block } from "@/content/articles";

export function DocBody({ body }: { body: Block[] }) {
  return (
    <div className="prose-atlas">
      {body.map((b, i) => (
        <div key={i}>
          {b.h && <h2>{b.h}</h2>}
          {b.p && <p>{b.p}</p>}
          {b.list && (
            <ul>
              {b.list.map((li) => (
                <li key={li}>{li.includes("https://") ? <code>{li}</code> : li}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export function DocsShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <section className="wrap grid grid-cols-1 gap-8 py-10 md:grid-cols-[220px_1fr] md:gap-12">
      <nav aria-label="Docs" className="md:sticky md:top-24 md:self-start">
        <p className="label mb-3">Documentation</p>
        <ul className="flex gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
          {DOCS.map((d) => {
            const on = d.slug === active;
            return (
              <li key={d.slug} className="shrink-0">
                <Link href={d.slug === "overview" ? "/docs" : `/docs/${d.slug}`} className={`block rounded-lg px-3 py-2 text-[14px] ${on ? "bg-card-2 font-medium text-ink shadow-sm" : "text-body hover:bg-card"}`}>
                  {d.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="min-w-0 max-w-[720px]">{children}</div>
    </section>
  );
}
