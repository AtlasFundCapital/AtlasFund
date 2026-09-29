export const TIMELINE = [
  { year: "Q3 2026", label: "Foundations", text: "Atlas Fund starts on Robinhood Chain. Site, wallet connection and live chain reads go public; fund, vault and treasury designs are published for review.", done: true },
  { year: "Launch", label: "Token and contracts", text: "The $ATLAS contract address is published in the site header and footer. Product contracts are deployed, reviewed and linked from their pages.", done: false },
  { year: "After launch", label: "Vaults open", text: "Anchor and Summit vaults accept deposits with published caps that grow as each vault builds a track record.", done: false },
  { year: "Planned", label: "Funds and mandates", text: "Core, Dollar and Equity funds open for subscriptions; the first treasury mandates are onboarded under written policies.", done: false },
];

/** Roles, not people: the team is described by what each seat is responsible for. */
export const ROLES = [
  { role: "Portfolio lead", scope: "Owns allocation inside each product's policy and signs off every rebalance rule before it is automated.", glyph: "P" },
  { role: "Risk lead", scope: "Runs the listing review, sets exposure caps and exit thresholds, and writes the review after every alert.", glyph: "R" },
  { role: "Engineering lead", scope: "Builds the contracts, permission policies and agents that turn written rules into enforced ones.", glyph: "E" },
];

export const PRINCIPLES = [
  { title: "Written before executed", text: "No position exists without a rule that allows it." },
  { title: "Non-custodial by design", text: "Funds sit in contracts and client accounts, never in ours." },
  { title: "Visible by default", text: "Every holding and every action can be checked on the explorer." },
  { title: "Automation with limits", text: "Agents act fast, but only inside permissions they cannot change." },
];

export const VALUES = [
  { title: "Clarity", text: "Say the simple version first. If a rule cannot be explained in two sentences, it is not ready to move money." },
  { title: "Rigour", text: "Check the number, then check where the number came from." },
  { title: "Ownership", text: "Whoever ships a change stays with it until it has run through a full cycle." },
  { title: "Candour", text: "Bad news travels first and fastest. Nobody is punished for raising it." },
  { title: "Patience", text: "Caps start small and grow with evidence, not with excitement." },
  { title: "Curiosity", text: "Ask how a market really works before asking what it pays." },
  { title: "Care", text: "Other people's money is treated as heavier than our own." },
  { title: "Focus", text: "Fewer products, run properly, beat many products run loosely." },
];

export const BENEFITS = [
  "Fully remote, with overlap hours instead of fixed hours",
  "Equipment budget for your home setup",
  "Yearly learning budget",
  "Co-working allowance",
  "Paid time off that people actually take",
  "Quiet weeks at the end of the year",
];

export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  summary: string;
  duties: string[];
  profile: string[];
};

export const JOBS: Job[] = [
  {
    slug: "smart-contract-engineer",
    title: "Smart Contract Engineer",
    team: "Engineering",
    location: "Remote",
    summary: "Build the vault, fund and permission contracts that hold client capital, and the test suites that keep them honest.",
    duties: ["Write and review Solidity for vaults, share tokens and policy modules.", "Own invariant and fork tests for every contract you touch.", "Work with the risk lead to turn written limits into enforced ones."],
    profile: ["Shipped production contracts that held real value.", "Comfortable reading other teams' code before integrating it.", "Writes clear explanations of trade-offs."],
  },
  {
    slug: "risk-analyst",
    title: "Risk Analyst",
    team: "Risk",
    location: "Remote",
    summary: "Review markets before we list them, set the caps and thresholds our agents enforce, and write up every alert.",
    duties: ["Run listing reviews for lending markets and collateral types.", "Maintain exposure caps and exit thresholds per vault.", "Publish monthly risk notes."],
    profile: ["Understands lending market mechanics in depth.", "Can model liquidity under stress with real data.", "Prefers boring, well-documented decisions."],
  },
  {
    slug: "automation-engineer",
    title: "Automation Engineer",
    team: "Engineering",
    location: "Remote",
    summary: "Run the monitoring and agent stack that watches every position and acts inside its permissions within seconds.",
    duties: ["Build and operate indexers, monitors and execution agents.", "Keep alerting quiet, accurate and reviewed.", "Drill failure scenarios on forks before they happen for real."],
    profile: ["Operated production services with on-call responsibility.", "Fluent in TypeScript or Rust and EVM tooling.", "Cares about observability as much as features."],
  },
  {
    slug: "treasury-associate",
    title: "Treasury Associate",
    team: "Mandates",
    location: "Remote",
    summary: "Help teams draft investment policies, then run the monthly reporting that shows how their treasury followed them.",
    duties: ["Run financial diagnostics for prospective mandates.", "Co-draft investment policies with client teams.", "Produce monthly and quarterly reports."],
    profile: ["Background in treasury, fund operations or audit.", "Confident with onchain data and explorers.", "Writes precise, readable reports."],
  },
];

export const findJob = (slug: string) => JOBS.find((j) => j.slug === slug);
