import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, FundMark, TreasuryMark, VaultMark } from "@/components/icons";
import { categoryLabel, formatDate, sortedArticles, type Article } from "@/content/articles";

export function PageHero({
  title,
  lead,
  actions,
  aside,
  children,
}: {
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="wrap grid grid-cols-1 items-center gap-10 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <Reveal>
          <h1 className="h-display max-w-[640px]">{title}</h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 max-w-[440px] text-[16px] leading-[1.45] text-body">{lead}</p>
        </Reveal>
        {actions && (
          <Reveal delay={140}>
            <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
          </Reveal>
        )}
        {children}
      </div>
      {aside && <div className="min-w-0">{aside}</div>}
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`wrap py-12 md:py-16 ${className}`}>{children}</section>;
}

export function SectionHead({ title, action }: { title: string; action?: { label: string; href: string } }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="h-section max-w-[720px]">{title}</h2>
      {action && (
        <Link href={action.href} className="btn btn-sm shrink-0">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function SampleBadge({ children = "Sample data" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-brass/40 bg-brass-3/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brass">{children}</span>;
}

export function PostCard({ a, big = false }: { a: Article; big?: boolean }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group block h-full rounded-xl p-3 transition-colors hover:bg-card">
      <div className={`overflow-hidden rounded-lg bg-card ${big ? "aspect-[16/8]" : "aspect-[16/9]"}`}>
        <img src={a.cover} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="pill">{categoryLabel(a.category)}</span>
        <span className="text-[12px] text-mute">{formatDate(a.date)}</span>
      </div>
      <p className="mt-2 text-[17px] font-medium leading-snug text-ink">{a.title}</p>
      <p className="mt-1.5 text-[13px] text-body">{a.subtitle}</p>
    </Link>
  );
}

export function PostGrid({
  title = "Notes on disciplined onchain asset management",
  filter,
  exclude,
  limit = 3,
}: {
  title?: string;
  filter?: (a: Article) => boolean;
  exclude?: string;
  limit?: number;
}) {
  const pool = sortedArticles().filter((a) => a.slug !== exclude);
  const posts = pool.filter(filter ?? (() => true));
  // Top up with the latest posts when a topic has fewer than `limit`.
  const shown = (posts.length >= limit ? posts : [...posts, ...pool.filter((a) => !posts.includes(a))]).slice(0, limit);
  return (
    <Section>
      <SectionHead title={title} action={{ label: "View all", href: "/blog" }} />
      <div className="-mx-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a, i) => (
          <Reveal key={a.slug} delay={i * 60} className="h-full">
            <PostCard a={a} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const PRODUCTS = [
  { href: "/funds", name: "Funds", Icon: FundMark, lead: "Tokenised onchain funds", text: "Hold one share token and get a spread of positions across vetted venues, priced from onchain net asset value." },
  { href: "/vaults", name: "Vaults", Icon: VaultMark, lead: "Automated lending vaults", text: "Lend into reviewed markets under published caps, with agents that exit on their own when limits are crossed." },
  { href: "/treasuries", name: "Treasuries", Icon: TreasuryMark, lead: "Policy-led treasury mandates", text: "Keep your reserves in your own account while we run them under an investment policy you helped write." },
];

export function ProductCards() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {PRODUCTS.map((p, i) => (
        <Reveal key={p.href} delay={i * 70} className="h-full">
          <Link href={p.href} className="card group relative flex h-full flex-col p-6 pb-20 transition-colors hover:bg-card-2">
            <span className="flex items-center gap-2.5">
              <p.Icon className="size-9 text-ink" />
              <span className="text-[36px] font-normal leading-none tracking-[-0.03em] text-ink">{p.name}</span>
            </span>
            <p className="mt-5 text-[15px] font-medium text-ink">{p.lead}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-body">{p.text}</p>
            <span className="absolute bottom-6 right-6 grid size-9 place-items-center rounded-lg bg-ink text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/** Three titled columns of plain text. */
export function Columns({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 60}>
          <h3 className="text-[22px] font-medium tracking-tight text-ink">{it.title}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-body">{it.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Title-left, text-right rows. */
export function Rows({ items }: { items: { title: string; sub?: string; text: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 50}>
          <div className="card grid grid-cols-1 gap-3 p-5 sm:p-6 md:grid-cols-[300px_1fr] md:items-center">
            <div>
              <p className="text-[26px] font-normal leading-tight tracking-tight text-ink">{it.title}</p>
              {it.sub && <p className="mt-1 text-[14px] font-medium text-ink">{it.sub}</p>}
            </div>
            <p className="max-w-[560px] text-[14px] leading-relaxed text-body">{it.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Cards with a large title and short text. */
export function TitleCards({ items, cols = 3 }: { items: { title: string; text: string; sub?: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 2 ? "md:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 gap-2 ${grid}`}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 50} className="h-full">
          <div className="card h-full p-6">
            <p className="text-[26px] font-normal leading-tight tracking-tight text-ink">{it.title}</p>
            {it.sub && <p className="mt-2 text-[14px] font-medium text-ink">{it.sub}</p>}
            <p className="mt-3 text-[14px] leading-relaxed text-body">{it.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function CtaBand({ title, text, actions }: { title: string; text?: string; actions: ReactNode }) {
  return (
    <Section>
      <Reveal>
        <p className="max-w-[760px] text-[26px] leading-[1.3] tracking-tight text-ink sm:text-[32px]">
          {title}
          {text && (
            <>
              <br />
              <span className="text-body">{text}</span>
            </>
          )}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
      </Reveal>
    </Section>
  );
}

/** Stat tile: small label over a big number. */
export function Stat({ label, value, note }: { label: string; value: ReactNode; note?: ReactNode }) {
  return (
    <div className="card p-5">
      <p className="text-[13px] text-body">{label}</p>
      <p className="h-number mt-2 text-[26px] leading-tight sm:text-[30px]">{value}</p>
      {note && <div className="mt-2 text-[12px] text-mute">{note}</div>}
    </div>
  );
}
