import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { JOBS, findJob } from "@/content/company";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => JOBS.map((j) => ({ slug: j.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const j = findJob((await params).slug);
  return j ? { title: j.title, description: j.summary } : {};
}

export default async function JobPage({ params }: Props) {
  const j = findJob((await params).slug);
  if (!j) notFound();
  return (
    <section className="wrap grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-[13px] text-body hover:text-ink">
          <ArrowLeft className="size-4" /> All roles
        </Link>
        <h1 className="h-display mt-6 text-[clamp(34px,4.4vw,56px)]">{j.title}</h1>
        <p className="mt-5 max-w-[620px] text-[16px] leading-relaxed text-body">{j.summary}</p>
        <div className="prose-atlas mt-4 max-w-[640px]">
          <h2>What you will do</h2>
          <ul>
            {j.duties.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>Who you are</h2>
          <ul>
            {j.profile.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="card h-fit p-6 lg:sticky lg:top-24">
        <dl className="space-y-3 text-[14px]">
          <div className="flex justify-between gap-4">
            <dt className="text-mute">Team</dt>
            <dd className="text-ink">{j.team}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-mute">Location</dt>
            <dd className="text-ink">{j.location}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-mute">Type</dt>
            <dd className="text-ink">Full time</dd>
          </div>
        </dl>
        <Link href="/contact?topic=Jobs" className="btn mt-6 w-full">
          Apply
        </Link>
        <p className="mt-3 text-[12px] text-mute">Tell us about your work and link anything you have shipped.</p>
      </aside>
    </section>
  );
}
