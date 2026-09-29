import type { MetadataRoute } from "next";
import { BRAND } from "@/config/brand";
import { ARTICLES } from "@/content/articles";
import { DOCS } from "@/content/docs";
import { FUNDS, VAULTS } from "@/content/products";
import { JOBS } from "@/content/company";

const STATIC = ["", "/funds", "/vaults", "/treasuries", "/blog", "/about", "/jobs", "/brand", "/reports", "/contact", "/docs", "/app", "/analytics", "/terms-of-service", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC.map((p) => ({ url: `${BRAND.url}${p}` })),
    ...FUNDS.map((f) => ({ url: `${BRAND.url}/funds/${f.slug}` })),
    ...VAULTS.map((v) => ({ url: `${BRAND.url}/vaults/${v.slug}` })),
    ...ARTICLES.map((a) => ({ url: `${BRAND.url}/blog/${a.slug}`, lastModified: a.date })),
    ...DOCS.filter((d) => d.slug !== "overview").map((d) => ({ url: `${BRAND.url}/docs/${d.slug}` })),
    ...JOBS.map((j) => ({ url: `${BRAND.url}/jobs/${j.slug}` })),
  ];
}
