/*
 * Product designs. Nothing here is deployed yet: every number is a design
 * target or an illustrative sample, and the pages say so next to it.
 */

export type Allocation = { label: string; share: number };

export type Fund = {
  slug: string;
  name: string;
  short: string;
  asset: string;
  summary: string;
  strategy: string;
  cover: string;
  targetRange: string;
  liquidity: string;
  allocation: Allocation[];
  rules: string[];
};

export const FUNDS: Fund[] = [
  {
    slug: "atlas-core",
    name: "Atlas Core Fund",
    short: "Core",
    asset: "ETH",
    summary: "One share token for a spread of ETH-denominated positions across vetted lending and liquidity venues.",
    strategy:
      "Core holds ETH and ETH-backed positions only. It spreads capital across lending markets and deep liquidity pools, keeps a standing cash buffer for redemptions, and rebalances when any position drifts outside its band.",
    cover: "/art/cube.webp",
    targetRange: "Design target, not a forecast",
    liquidity: "Same-block redemptions up to the buffer, larger ones queued",
    allocation: [
      { label: "Lending markets", share: 45 },
      { label: "Liquidity pools", share: 30 },
      { label: "Staked ETH positions", share: 15 },
      { label: "Idle buffer", share: 10 },
    ],
    rules: [
      "ETH and ETH-backed assets only.",
      "No single venue above 25% of the fund.",
      "At least 10% held idle for redemptions.",
      "Positions exit automatically on oracle failure.",
    ],
  },
  {
    slug: "atlas-dollar",
    name: "Atlas Dollar Fund",
    short: "Dollar",
    asset: "USD stablecoins",
    summary: "A dollar share that earns from overcollateralised lending, with strict caps on every issuer and market.",
    strategy:
      "Dollar lends stablecoins against overcollateralised positions in markets that pass our listing review. Issuer exposure is capped so no single stablecoin can dominate the fund, and markets are exited automatically when utilisation or price feeds break their limits.",
    cover: "/art/coin.webp",
    targetRange: "Design target, not a forecast",
    liquidity: "Same-block redemptions up to the buffer, larger ones queued",
    allocation: [
      { label: "Overcollateralised lending", share: 70 },
      { label: "Short-dated onchain credit", share: 15 },
      { label: "Idle buffer", share: 15 },
    ],
    rules: [
      "Stablecoins only; no single issuer above 40%.",
      "Only overcollateralised lending markets.",
      "At least 15% held idle for redemptions.",
      "Automated exit on utilisation above threshold.",
    ],
  },
  {
    slug: "atlas-equity-basket",
    name: "Atlas Equity Basket",
    short: "Equity",
    asset: "Tokenised equities",
    summary: "A single token that tracks a rules-based basket of tokenised stocks available on Robinhood Chain.",
    strategy:
      "The basket holds tokenised equities that are natively issued on Robinhood Chain, weighted by a published rule and rebalanced on a fixed calendar. It is designed as a passive building block other applications can hold or lend against.",
    cover: "/art/bars.webp",
    targetRange: "Tracks its basket; no yield target",
    liquidity: "Mint and redeem in kind or against stablecoins",
    allocation: [
      { label: "Largest holdings (capped)", share: 55 },
      { label: "Remaining basket", share: 40 },
      { label: "Cash for rebalancing", share: 5 },
    ],
    rules: [
      "Only natively issued tokenised equities are eligible.",
      "No single holding above 12% at rebalance.",
      "Rebalances on a published calendar.",
      "Tokens are identified by contract address, never by ticker.",
    ],
  },
];

export type Vault = {
  slug: string;
  name: string;
  tier: "Anchor" | "Summit";
  asset: string;
  summary: string;
  cover: string;
  buffer: string;
  maxMarket: string;
  exits: string[];
  markets: Allocation[];
};

export const VAULTS: Vault[] = [
  {
    slug: "anchor-usd",
    name: "Anchor USD",
    tier: "Anchor",
    asset: "USD stablecoins",
    summary: "Conservative stablecoin lending with a large idle buffer and tight caps per market.",
    cover: "/art/vault.webp",
    buffer: "20% idle",
    maxMarket: "20% per market",
    exits: ["Utilisation above 92% for 30 minutes", "Oracle older than its heartbeat", "Price deviation above 2%"],
    markets: [
      { label: "Blue-chip collateral market A", share: 34 },
      { label: "Blue-chip collateral market B", share: 26 },
      { label: "ETH collateral market", share: 20 },
      { label: "Idle buffer", share: 20 },
    ],
  },
  {
    slug: "anchor-eth",
    name: "Anchor ETH",
    tier: "Anchor",
    asset: "ETH",
    summary: "ETH lending into the deepest markets only, built for withdrawals on demand.",
    cover: "/art/lock.webp",
    buffer: "20% idle",
    maxMarket: "25% per market",
    exits: ["Utilisation above 90% for 30 minutes", "Collateral liquidity drop above 30% in a day", "Oracle failure"],
    markets: [
      { label: "Staked ETH collateral market", share: 40 },
      { label: "Stablecoin collateral market", share: 40 },
      { label: "Idle buffer", share: 20 },
    ],
  },
  {
    slug: "summit-usd",
    name: "Summit USD",
    tier: "Summit",
    asset: "USD stablecoins",
    summary: "Wider market list and faster rebalancing to follow borrowing demand, inside the same written limits.",
    cover: "/art/pyramid.webp",
    buffer: "8% idle",
    maxMarket: "15% per market",
    exits: ["Utilisation above 95% for 15 minutes", "Oracle older than its heartbeat", "Market listed less than 30 days capped at 5%"],
    markets: [
      { label: "Blue-chip collateral markets", share: 42 },
      { label: "Tokenised equity collateral markets", share: 22 },
      { label: "Newer vetted markets", share: 18 },
      { label: "Idle buffer", share: 8 },
      { label: "Other ETH collateral", share: 10 },
    ],
  },
];

export const findFund = (slug: string) => FUNDS.find((f) => f.slug === slug);
export const findVault = (slug: string) => VAULTS.find((v) => v.slug === slug);

/** Deterministic pseudo-random walk, so sample charts render the same everywhere. */
export function sampleSeries(seed: number, points: number, start: number, drift: number, vol: number) {
  let s = seed >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < points; i++) {
    v = Math.max(0, v + drift + (rand() - 0.5) * vol);
    out.push(v);
  }
  return out;
}
