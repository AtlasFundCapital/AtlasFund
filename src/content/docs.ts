import type { Block } from "@/content/articles";

export type DocPage = { slug: string; title: string; lead: string; body: Block[] };

export const DOCS: DocPage[] = [
  {
    slug: "overview",
    title: "Overview",
    lead: "Atlas Fund manages capital on Robinhood Chain through three products that share one rulebook.",
    body: [
      { h: "Products", list: ["Funds: tokenised portfolios with a share token priced from onchain net asset value.", "Vaults: automated lending strategies in two risk tiers, Anchor and Summit.", "Treasuries: bespoke mandates run under a client's written investment policy."] },
      { h: "Shared principles", list: ["Every permitted action is written into an onchain policy before capital moves.", "Assets stay in contracts or client accounts; Atlas never takes custody.", "Automated agents watch every position and can only act within their permissions.", "Every holding can be verified on the explorer."] },
      { h: "Status", p: "The site, wallet connection and live chain reads are live. Deposits, subscriptions and mandates open at launch, together with the published $ATLAS contract address." },
    ],
  },
  {
    slug: "wallet-and-network",
    title: "Wallet and network",
    lead: "How to connect and what the site asks your wallet to do.",
    body: [
      { h: "Network details", list: ["Network name: Robinhood Chain", "Chain id: 4663 (hex 0x1237)", "Currency: ETH", "RPC: https://rpc.mainnet.chain.robinhood.com", "Explorer: https://robinhoodchain.blockscout.com"] },
      { h: "Connecting", p: "Press Connect wallet in the header. The site lists every browser wallet it finds through the multi-wallet discovery standard. After you share an account, it asks the wallet to switch to Robinhood Chain, or to add the network if the wallet does not know it yet." },
      { h: "What is shared", p: "Connecting shares your public address only. The site never asks for a signature or a transaction until products open, and it never sees your keys." },
      { h: "Disconnecting", p: "Open the wallet panel and press Disconnect. Wallets that support it also drop the site's permission, so the next visit asks again." },
    ],
  },
  {
    slug: "funds",
    title: "Funds",
    lead: "Share tokens backed by a portfolio, priced from onchain data.",
    body: [
      { h: "Share token", p: "Each fund issues a standard token. Shares are minted when a subscription settles and burned on redemption, both at the current net asset value." },
      { h: "Net asset value", p: "A pricing contract reads the fund's balances and oracle prices and computes value per share. Anyone can call it for any block." },
      { h: "Policies", p: "The accounts that hold fund positions can only perform whitelisted actions on whitelisted venues. Anything outside the list is rejected at the contract level." },
    ],
  },
  {
    slug: "vaults",
    title: "Vaults",
    lead: "Automated lending strategies with explicit risk tiers.",
    body: [
      { h: "Tiers", list: ["Anchor: larger idle buffer, tighter caps, fewer markets. Built for withdrawals on demand.", "Summit: more markets and faster rebalancing to follow borrowing demand, within published limits."] },
      { h: "Agents", p: "Rebalancing agents move liquidity between approved markets; exit agents withdraw from a market when its thresholds are breached. Both act through the vault's policy and cannot send funds elsewhere." },
      { h: "Caps", p: "Every vault starts with a deposit cap that grows only as the vault builds a track record." },
    ],
  },
  {
    slug: "treasuries",
    title: "Treasuries",
    lead: "Mandates run under a written investment policy.",
    body: [
      { h: "Process", list: ["Diagnostics: runway, concentration and liquidity review.", "Policy: permitted assets, venues, limits and reporting duties, drafted with the client.", "Execution: the policy is encoded as permissions on the client's own account.", "Reporting: monthly and quarterly, every line linked to the chain."] },
    ],
  },
  {
    slug: "token",
    title: "$ATLAS token",
    lead: "The community token of Atlas Fund on Robinhood Chain.",
    body: [
      { p: "The contract address is published in the site header, the mobile menu and the footer on launch day. Until then those places show that the address is coming soon." },
      { h: "Safety", list: ["Trust only the address shown on atlasfund.capital and the official X account.", "Holding $ATLAS is not a share of any fund, vault or mandate.", "Nothing in these docs is financial advice."] },
    ],
  },
];

export const findDoc = (slug: string) => DOCS.find((d) => d.slug === slug);
