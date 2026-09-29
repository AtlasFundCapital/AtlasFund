import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/*
 * ETH/USD from keyless public tickers: OKX first, CoinGecko second. The last
 * good answer is kept for a minute so page views do not hammer either feed.
 * A failed read is never cached.
 */
type Quote = { usd: number; change24h: number | null; source: string; at: number };

let cached: Quote | null = null;
const TTL = 60_000;

async function fromOkx(): Promise<Quote> {
  const res = await fetch("https://www.okx.com/api/v5/market/ticker?instId=ETH-USDT", { cache: "no-store", signal: AbortSignal.timeout(5000) });
  const body = (await res.json()) as { data?: { last: string; open24h: string }[] };
  const t = body.data?.[0];
  const last = Number(t?.last);
  const open = Number(t?.open24h);
  if (!res.ok || !Number.isFinite(last) || last <= 0) throw new Error("okx");
  return { usd: last, change24h: open > 0 ? ((last - open) / open) * 100 : null, source: "OKX", at: Date.now() };
}

async function fromCoinGecko(): Promise<Quote> {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true", {
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  const body = (await res.json()) as { ethereum?: { usd?: number; usd_24h_change?: number } };
  const usd = Number(body.ethereum?.usd);
  if (!res.ok || !Number.isFinite(usd) || usd <= 0) throw new Error("coingecko");
  return { usd, change24h: body.ethereum?.usd_24h_change ?? null, source: "CoinGecko", at: Date.now() };
}

export async function GET() {
  if (cached && Date.now() - cached.at < TTL) return NextResponse.json(cached, { headers: { "cache-control": "no-store" } });
  for (const read of [fromOkx, fromCoinGecko]) {
    try {
      cached = await read();
      return NextResponse.json(cached, { headers: { "cache-control": "no-store" } });
    } catch {
      // Try the next feed.
    }
  }
  if (cached) return NextResponse.json({ ...cached, stale: true }, { headers: { "cache-control": "no-store" } });
  return NextResponse.json({ error: "Price feeds unavailable." }, { status: 502 });
}
