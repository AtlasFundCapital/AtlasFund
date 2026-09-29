import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PostCard } from "@/components/site/blocks";
import { CATEGORIES, categoryLabel, formatDate, isCategory, sortedArticles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, reports, case studies and research from Atlas Fund.",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = isCategory(category) ? category : null;
  const all = sortedArticles();
  const posts = active ? all.filter((a) => a.category === active) : all;
  const featured = all[0];
  const tabs = [{ key: null, label: "All" }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.label }))];

  return (
    <>
      <section className="wrap pt-8">
        <Link href={`/blog/${featured.slug}`} className="group relative block overflow-hidden rounded-xl">
          <img src={featured.cover} alt="" className="aspect-[16/10] w-full object-cover sm:aspect-[16/6]" />
          <div className="absolute bottom-3 left-3 max-w-[340px] rounded-lg bg-card-2/95 p-4 shadow-lg backdrop-blur sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="pill">{categoryLabel(featured.category)}</span>
              <span className="text-[12px] text-mute">{formatDate(featured.date)}</span>
            </div>
            <p className="mt-2 text-[20px] leading-snug tracking-tight text-ink sm:text-[26px]">{featured.title}</p>
          </div>
        </Link>
      </section>

      <section className="wrap py-10">
        <nav className="-mx-1 flex gap-1 overflow-x-auto pb-2" aria-label="Filter posts">
          {tabs.map((t) => {
            const on = t.key === active;
            return (
              <Link
                key={t.label}
                href={t.key ? `/blog?category=${t.key}` : "/blog"}
                scroll={false}
                className={`shrink-0 rounded-lg px-4 py-2 text-[13px] transition-colors ${on ? "bg-card-2 text-ink shadow-sm" : "text-body hover:bg-card"}`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="-mx-3 mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 60} className="h-full">
              <PostCard a={a} />
            </Reveal>
          ))}
        </div>
        {posts.length === 0 && <p className="py-10 text-center text-body">Nothing in this category yet.</p>}
      </section>
    </>
  );
}
