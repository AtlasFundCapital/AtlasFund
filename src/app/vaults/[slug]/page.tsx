import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/app/ProductDetail";
import { DepositPanel } from "@/components/app/DepositPanel";
import { VAULTS, findVault } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => VAULTS.map((v) => ({ slug: v.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = findVault((await params).slug);
  return v ? { title: v.name, description: v.summary } : {};
}

export default async function VaultPage({ params }: Props) {
  const v = findVault((await params).slug);
  if (!v) notFound();
  return (
    <ProductDetail
      back={{ href: "/vaults", label: "All vaults" }}
      kicker={`${v.tier} vault · ${v.asset}`}
      name={v.name}
      summary={v.summary}
      cover={v.cover}
      seed={v.slug.length * 131}
      facts={[
        { label: "Risk tier", value: v.tier },
        { label: "Asset", value: v.asset },
        { label: "Idle buffer", value: v.buffer },
        { label: "Market cap", value: v.maxMarket },
      ]}
      allocationTitle="Target market split"
      allocation={v.markets}
      panel={<DepositPanel product={v.name} asset={v.asset} />}
    >
      <h2>Automated exits</h2>
      <p>An exit agent withdraws from a market as soon as any of these conditions holds:</p>
      <ul>
        {v.exits.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <h2>Deposit cap</h2>
      <p>The vault opens with a modest deposit cap. The cap is raised in published steps as the vault builds a record, never all at once.</p>
      <h2>Status</h2>
      <p>This vault is a published design. At launch its contract address appears here and every figure on this page is read from Robinhood Chain.</p>
    </ProductDetail>
  );
}
