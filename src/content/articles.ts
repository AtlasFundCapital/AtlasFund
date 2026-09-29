export type Category = "articles" | "reports" | "case-study" | "research";
export type Topic = "Funds" | "Vaults" | "Treasuries" | "Company" | "Network";

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "articles", label: "Articles" },
  { key: "reports", label: "Reports" },
  { key: "case-study", label: "Case Study" },
  { key: "research", label: "Research" },
];

export const categoryLabel = (c: Category) => CATEGORIES.find((x) => x.key === c)?.label ?? c;
export const isCategory = (v: string | undefined): v is Category => CATEGORIES.some((c) => c.key === v);

export type Block = { h?: string; p?: string; list?: string[] };

export type Article = {
  slug: string;
  category: Category;
  topic: Topic;
  date: string; // ISO
  title: string;
  subtitle: string;
  cover: string;
  body: Block[];
};

export const ARTICLES: Article[] = [
  {
    slug: "atlas-fund-opens-on-robinhood-chain",
    category: "articles",
    topic: "Company",
    date: "2026-09-26",
    title: "Atlas Fund opens on Robinhood Chain",
    subtitle: "Rules first, capital second",
    cover: "/art/globe.webp",
    body: [
      { p: "Atlas Fund is an onchain asset manager built on Robinhood Chain. We run three kinds of product: tokenised funds that hold a basket of positions behind a single share token, automated vaults that lend into vetted markets, and treasury mandates for teams that want their reserves managed under a written policy." },
      { p: "Our starting point is simple. Every rule that governs capital should be written down before a single dollar moves, and every position should be visible to anyone who cares to look. Discipline, automation and transparency are not a slogan for us; they are the order in which we build." },
      { h: "What you can do today", list: ["Connect a browser wallet and move it onto Robinhood Chain in one step.", "Read your live ETH balance, the current block and gas price straight from the chain.", "Browse the fund, vault and treasury designs, including their policies and risk limits.", "Read the documentation that describes how each product will work at launch."] },
      { h: "What opens at launch", p: "Deposits, redemptions and mandate onboarding open once the $ATLAS contract is published and the product contracts are deployed and reviewed. Until then, every figure on this site that is not read live from the chain is marked as a sample." },
    ],
  },
  {
    slug: "writing-the-policy-before-the-position",
    category: "research",
    topic: "Treasuries",
    date: "2026-09-19",
    title: "Writing the policy before the position",
    subtitle: "Why an investment policy is the real product",
    cover: "/art/scales.webp",
    body: [
      { p: "Most losses in onchain treasuries do not come from exotic exploits. They come from positions nobody agreed to: an allocation that crept past its limit, a token that was never meant to be held, a market that stayed open after the reason for being in it had gone." },
      { p: "An investment policy statement fixes that by deciding in advance what is allowed. It lists permitted assets and venues, caps on each, the liquidity the treasury must always keep, and who has to sign off when any of it changes." },
      { h: "Policy as code", p: "The step that matters onchain is translating that document into permissions. When a policy says no more than a fifth of reserves in any single lending market, the account that executes trades should be physically unable to exceed it. The written policy and the enforced one must be the same thing." },
      { h: "A short checklist", list: ["Every permitted action is named, and everything else is refused by default.", "Limits are expressed in units the contract can check, not in adjectives.", "Changing a limit takes more signatures than using it.", "Reports compare what happened with what the policy allowed."] },
    ],
  },
  {
    slug: "anchor-vault-design-notes",
    category: "articles",
    topic: "Vaults",
    date: "2026-09-12",
    title: "Anchor vault design notes",
    subtitle: "Liquidity before yield",
    cover: "/art/vault.webp",
    body: [
      { p: "Anchor is the conservative tier of Atlas vaults. It is designed for depositors who care more about getting their funds back on demand than about the last basis point of yield." },
      { h: "How it allocates", p: "Anchor lends only into markets that pass our listing review, and it keeps a liquidity buffer that is never lent out. Exposure to any single market is capped, and the cap is smaller for newer or thinner markets." },
      { h: "When it exits", list: ["Utilisation in a market stays above the exit threshold for longer than the grace window.", "A price feed goes stale or diverges from its reference beyond tolerance.", "Collateral in a market loses liquidity faster than our model allows."] },
      { p: "All parameters in this note are design targets. They will be published with the vault contract at launch and can be read onchain from then on." },
    ],
  },
  {
    slug: "summit-vault-design-notes",
    category: "articles",
    topic: "Vaults",
    date: "2026-09-05",
    title: "Summit vault design notes",
    subtitle: "A wider net, the same guard rails",
    cover: "/art/pyramid.webp",
    body: [
      { p: "Summit is the higher-utilisation tier. It allocates across a broader list of vetted markets so it can follow borrowing demand when rates rise, while staying inside the same kind of written limits as Anchor." },
      { h: "What changes compared with Anchor", list: ["More markets are eligible, including newer ones with smaller caps.", "The idle buffer is thinner, so withdrawals can queue during heavy demand.", "Rebalancing runs more often to follow the best risk-adjusted rate."] },
      { h: "What does not change", p: "Every action is still bounded by onchain policy, every exit condition is still automated, and every position is still visible from the vault page." },
    ],
  },
  {
    slug: "treasury-report-august-2026",
    category: "reports",
    topic: "Treasuries",
    date: "2026-09-02",
    title: "Sample treasury report: August 2026",
    subtitle: "The format our mandate reports will follow",
    cover: "/art/donut.webp",
    body: [
      { p: "This is an illustrative report. No client assets are under management yet, and the figures below are placeholders chosen to show the layout, not results." },
      { h: "Sections every report contains", list: ["Holdings by asset and venue, with the policy limit next to each line.", "Changes over the period: deposits, withdrawals, rebalances and why they happened.", "Income by source, split into realised and unrealised.", "Exceptions: anything that came close to a limit, and what was done about it."] },
      { h: "Why the format matters", p: "A report is only useful if it can be checked. Each line in an Atlas report links to the transaction or contract state it describes, so a reader can verify it on the explorer instead of taking our word for it." },
    ],
  },
  {
    slug: "how-a-fund-share-is-priced",
    category: "research",
    topic: "Funds",
    date: "2026-08-28",
    title: "How a fund share is priced",
    subtitle: "Net asset value, block by block",
    cover: "/art/cube.webp",
    body: [
      { p: "An Atlas fund share is a standard token. What makes it worth something is the net asset value behind it: the fund's holdings, marked to market, divided by the shares in issue." },
      { h: "Where the numbers come from", p: "Balances are read directly from the accounts that hold the fund's positions. Prices come from onchain oracles with staleness and deviation checks. The calculation runs in a contract, so any block can be re-priced by anyone." },
      { h: "Subscriptions and redemptions", list: ["New shares are minted at the current NAV when a subscription settles.", "Redemptions burn shares and pay out a proportional slice of the fund.", "Large redemptions may settle over more than one block to avoid forced selling."] },
    ],
  },
  {
    slug: "illustrative-case-study-a-token-team-treasury",
    category: "case-study",
    topic: "Treasuries",
    date: "2026-08-21",
    title: "Illustrative case study: a token team treasury",
    subtitle: "From one wallet to a written mandate",
    cover: "/art/stack.webp",
    body: [
      { p: "This case study is hypothetical. It describes how we would take on a typical mandate so prospective clients can see the process end to end. It does not describe a real client." },
      { h: "The starting point", p: "A twenty-person team holds most of its runway in its own token and a smaller amount of ETH in a single multisig. Nobody owns the treasury as a job, and the team has two years of costs to cover." },
      { h: "What we would do", list: ["Measure runway in months under three price scenarios for the team's token.", "Draft a policy with the team: a stable reserve floor, permitted venues and caps.", "Encode the policy as permissions on the treasury account, then execute within it.", "Report monthly, with every line linked to the chain."] },
      { h: "What success looks like", p: "The team stops thinking about the treasury between reports, and the reports are boring. Boring is the goal." },
    ],
  },
  {
    slug: "illustrative-case-study-an-app-embedding-vaults",
    category: "case-study",
    topic: "Vaults",
    date: "2026-08-14",
    title: "Illustrative case study: an app embedding vaults",
    subtitle: "Yield as a feature, not a department",
    cover: "/art/flow.webp",
    body: [
      { p: "Another hypothetical. A wallet app wants to offer a savings balance without building a risk team. Atlas vault shares are ordinary tokens, so the app can route deposits into a vault and show the share balance like any other asset." },
      { h: "Who does what", list: ["The app owns the user relationship and the interface.", "The vault contract holds funds and enforces its own limits.", "Atlas maintains the listing review, monitoring and automated exits."] },
      { p: "Nothing in this arrangement requires the app to hold user funds or to trust Atlas with custody. That is the point of building it onchain." },
    ],
  },
  {
    slug: "automated-exits-explained",
    category: "research",
    topic: "Vaults",
    date: "2026-08-07",
    title: "Automated exits, explained",
    subtitle: "Seconds matter more than opinions",
    cover: "/art/shield.webp",
    body: [
      { p: "When a lending market goes wrong, the damage is usually done within a few blocks. A human on call can be fast, but not that fast, and not every time. That is why Atlas vaults rely on automated agents for exits." },
      { h: "What the agents watch", list: ["Utilisation and available liquidity in each market.", "Oracle freshness and deviation from reference prices.", "Sudden changes in collateral supply or borrow demand."] },
      { h: "What the agents are allowed to do", p: "Only what the vault policy permits: withdraw from a market, stop new deposits into it, or move funds to the idle buffer. They cannot send funds anywhere else. Every action they take is a normal transaction, visible on the explorer." },
    ],
  },
  {
    slug: "why-robinhood-chain",
    category: "articles",
    topic: "Network",
    date: "2026-07-31",
    title: "Why we build on Robinhood Chain",
    subtitle: "Cheap blocks, familiar tools",
    cover: "/art/orbit.webp",
    body: [
      { p: "Automated management needs frequent, small transactions: rebalances, price updates, exits. On a chain where each one is expensive, automation becomes something you do weekly. On Robinhood Chain it can happen every time conditions change." },
      { h: "What we get", list: ["Low fees that make frequent rebalancing sensible.", "Standard EVM tooling, so existing wallets and explorers just work.", "An ecosystem where tokenised assets already live next to crypto-native ones."] },
      { p: "The network id is 4663 and the native gas token is ETH. Any wallet that supports custom networks can reach it; this site will add it for you when you connect." },
    ],
  },
  {
    slug: "the-atlas-token",
    category: "articles",
    topic: "Company",
    date: "2026-07-24",
    title: "The $ATLAS token",
    subtitle: "What it is for, and what it is not",
    cover: "/art/coin.webp",
    body: [
      { p: "$ATLAS is the community token of Atlas Fund on Robinhood Chain. Its contract address will be published in the navigation bar and footer of this site on launch day, and nowhere else first." },
      { h: "Things to know", list: ["Only trust the address shown on atlasfund.capital and our official X account.", "Holding $ATLAS is not a share of any fund or vault, and is not a claim on their assets.", "Nothing on this site is an offer or financial advice."] },
    ],
  },
  {
    slug: "monitoring-without-a-war-room",
    category: "research",
    topic: "Funds",
    date: "2026-07-17",
    title: "Monitoring without a war room",
    subtitle: "Signals, thresholds and dull dashboards",
    cover: "/art/line.webp",
    body: [
      { p: "Good monitoring is quiet. It tracks a small number of signals per position, compares each with a threshold decided in advance, and raises its voice only when something crosses one." },
      { h: "Our rules of thumb", list: ["A signal without a threshold is decoration.", "A threshold without an automated response is a notification, not protection.", "Every alert that fires gets a written review, even when nothing was lost."] },
    ],
  },
];

export const sortedArticles = () => [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
