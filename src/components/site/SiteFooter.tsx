import Link from "next/link";
import { BRAND } from "@/config/brand";
import { FOOTER } from "@/config/nav";
import { Logo } from "@/components/Logo";
import { CaBlock } from "@/components/CopyCa";
import { NewsletterForm } from "@/components/site/forms";
import { LiveChainStrip } from "@/components/LiveChain";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-ink/10">
      <div className="wrap grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_auto_260px]">
        <div className="space-y-6">
          <Link href="/" aria-label="Atlas Fund home">
            <Logo />
          </Link>
          <p className="max-w-[320px] text-[13px] leading-relaxed text-body">{BRAND.slogan} Onchain asset management on Robinhood Chain.</p>
          <CaBlock />
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4" aria-label="Footer">
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-ink">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-[12px] text-body hover:text-ink">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[12px] text-body hover:text-ink">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <NewsletterForm />
      </div>
      <div className="wrap flex flex-col gap-4 border-t border-ink/10 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-body">
          <span>© 2026 {BRAND.name}. All rights reserved.</span>
          <Link href="/terms-of-service" className="hover:text-ink">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:text-ink">
            Privacy Policy
          </Link>
        </div>
        <LiveChainStrip className="text-[12px]" />
      </div>
    </footer>
  );
}
