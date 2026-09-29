import { BRAND } from "@/config/brand";

export type NavItem = { label: string; href: string; hint?: string; icon?: "fund" | "vault" | "treasury" | "doc" };

export const NAV: { label: string; items: NavItem[] }[] = [
  {
    label: "Solutions",
    items: [
      { label: "Vaults", href: "/vaults", hint: "Automated lending in two risk tiers", icon: "vault" },
      { label: "Funds", href: "/funds", hint: "Tokenised portfolios, priced onchain", icon: "fund" },
      { label: "Treasuries", href: "/treasuries", hint: "Mandates run under written policy", icon: "treasury" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "/blog", hint: "Articles, research and case studies" },
      { label: "Reports", href: "/reports", hint: "How holdings will be disclosed" },
      { label: "Analytics", href: "/analytics", hint: "Live Robinhood Chain readings" },
      { label: "Docs", href: "/docs", hint: "How every product works", icon: "doc" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", hint: "Who we are and how we operate" },
      { label: "Jobs", href: "/jobs", hint: "Open seats on the team" },
      { label: "Brand kit", href: "/brand", hint: "Logos, colours and type" },
      { label: "Contact", href: "/contact", hint: "Start a conversation" },
    ],
  },
];

export const FOOTER: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Vaults", href: "/vaults" },
      { label: "Funds", href: "/funds" },
      { label: "Treasuries", href: "/treasuries" },
      { label: "App", href: "/app" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Articles", href: "/blog?category=articles" },
      { label: "Reports", href: "/blog?category=reports" },
      { label: "Case Study", href: "/blog?category=case-study" },
      { label: "Research", href: "/blog?category=research" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About", href: "/about" },
      { label: "Jobs", href: "/jobs" },
      { label: "Analytics", href: "/analytics" },
      { label: "Docs", href: "/docs" },
      { label: "Brand", href: "/brand" },
      { label: "Reports", href: "/reports" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "X (Twitter)", href: BRAND.x, external: true },
      ...(BRAND.github ? [{ label: "GitHub", href: BRAND.github, external: true }] : []),
    ],
  },
];
