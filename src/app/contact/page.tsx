import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/site/forms";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Atlas Fund about vaults, funds, treasury mandates or integrations.",
};

type Props = { searchParams: Promise<{ topic?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { topic } = await searchParams;
  return (
    <section className="wrap grid grid-cols-1 gap-10 py-12 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <Reveal>
        <h1 className="h-display">
          Get in
          <br />
          touch
        </h1>
        <p className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-body">Tell us what you are looking for and we will come back to you directly.</p>
        <p className="mt-6 text-[13px] text-mute">
          Faster today:{" "}
          <a href={BRAND.x} target="_blank" rel="noreferrer" className="text-ink underline">
            {BRAND.xHandle}
          </a>
        </p>
      </Reveal>
      <Reveal delay={80}>
        <div className="card min-h-[420px] p-5 sm:p-8">
          <ContactForm initialTopic={topic ?? ""} />
        </div>
      </Reveal>
    </section>
  );
}
