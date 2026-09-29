import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/app/ProductDetail";
import { DepositPanel } from "@/components/app/DepositPanel";
import { FUNDS, findFund } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FUNDS.map((f) => ({ slug: f.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = findFund((await params).slug);
  return f ? { title: f.name, description: f.summary } : {};
}

export default async function FundPage({ params }: Props) {
  const f = findFund((await params).slug);
  if (!f) notFound();
  return (
    <ProductDetail
      back={{ href: "/funds", label: "All funds" }}
      kicker={`Fund · ${f.asset}`}
      name={f.name}
      summary={f.summary}
      cover={f.cover}
      seed={f.slug.length * 97}
      facts={[
        { label: "Base asset", value: f.asset },
        { label: "Share token", value: "Published at launch" },
        { label: "Liquidity", value: f.liquidity },
        { label: "Return target", value: f.targetRange },
      ]}
      allocationTitle="Target allocation"
      allocation={f.allocation}
      panel={<DepositPanel product={f.name} asset={f.asset} verb="Subscribe" />}
    >
      <h2>Strategy</h2>
      <p>{f.strategy}</p>
      <h2>Rules the fund cannot break</h2>
      <ul>
        {f.rules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <h2>Status</h2>
      <p>
        This fund is a published design. Its contracts are deployed at launch, after which this page reads value per share, holdings and flows directly from Robinhood Chain.
      </p>
    </ProductDetail>
  );
}
