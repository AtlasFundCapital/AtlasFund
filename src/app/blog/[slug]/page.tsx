import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/site/blocks";
import { ShareLinks } from "@/components/site/ShareLinks";
import { ArrowLeft } from "@/components/icons";
import { ARTICLES, categoryLabel, findArticle, formatDate } from "@/content/articles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = findArticle((await params).slug);
  if (!a) return {};
  return { title: a.title, description: a.subtitle, openGraph: { title: a.title, description: a.subtitle, images: [{ url: a.cover }] } };
}

export default async function ArticlePage({ params }: Props) {
  const a = findArticle((await params).slug);
  if (!a) notFound();
  return (
    <>
      <article className="wrap pt-10">
        <header className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[30px] font-medium leading-[1.2] tracking-[-0.02em] text-ink sm:text-[40px]">
            {a.title}
            <br />
            <span className="text-body">{a.subtitle}</span>
          </h1>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link href={`/blog?category=${a.category}`} className="pill hover:bg-paper-2">
              {categoryLabel(a.category)}
            </Link>
            <span className="text-[12px] text-mute">{formatDate(a.date)}</span>
            <span className="text-[12px] text-mute">· {a.topic}</span>
          </div>
        </header>
        <img src={a.cover} alt="" className="mx-auto mt-8 aspect-[16/8] w-full max-w-[980px] rounded-xl object-cover" />
        <div className="mx-auto max-w-[640px] py-10">
          <div className="prose-atlas">
            {a.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2>{b.h}</h2>}
                {b.p && <p>{b.p}</p>}
                {b.list && (
                  <ul>
                    {b.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] text-body hover:text-ink">
              <ArrowLeft className="size-4" /> Back to the blog
            </Link>
            <ShareLinks title={a.title} path={`/blog/${a.slug}`} />
          </div>
        </div>
      </article>
      <PostGrid title="Keep reading" exclude={a.slug} filter={(x) => x.topic === a.topic} />
    </>
  );
}
