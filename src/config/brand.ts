// Single place to change project identity. Everything on the site reads from here.
// The contract address below is a placeholder until launch: replace `CA` with the
// real 0x address and the navbar pill, mobile menu and footer block switch to a
// working copy button on their own.

const CA = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export const isAddress = (v: string): v is `0x${string}` =>
  /^0x[0-9a-fA-F]{40}$/.test(v);

export const BRAND = {
  name: "Atlas Fund",
  ticker: "ATLAS",
  symbol: "$ATLAS",
  domain: "atlasfund.capital",
  url: "https://atlasfund.capital",
  email: "team@atlasfund.capital",
  slogan: "Discipline, Automation, Transparency.",
  tagline: "Onchain asset management that answers to rules, not moods.",
  description:
    "Atlas Fund runs tokenised funds, automated vaults and treasury mandates on Robinhood Chain, with every rule written onchain and every position open to inspection.",
  x: "https://x.com/atlasfundx",
  xHandle: "@atlasfundx",
  /** Public GitHub link. Empty hides every GitHub link on the site. */
  github: "https://github.com/AtlasFundCapital/AtlasFund" as string,
  ca: CA,
} as const;

// Public endpoints are the default. An operator can point the site at a
// private RPC with ROBINHOOD_RPC_URL (server) / NEXT_PUBLIC_ROBINHOOD_RPC_URL
// (browser and server). Both are optional.
const PUBLIC_RPC = "https://rpc.mainnet.chain.robinhood.com";

export const CHAIN = {
  id: 4663,
  hex: "0x1237",
  name: "Robinhood Chain",
  nativeSymbol: "ETH",
  decimals: 18,
  publicRpc: PUBLIC_RPC,
  rpc: process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL || PUBLIC_RPC,
  /** Second public endpoint, used for reads only when the first one fails. */
  fallbackRpc: "https://robinhood-rpc.publicnode.com",
  explorer: "https://robinhoodchain.blockscout.com",
  explorerName: "Blockscout",
} as const;

/** RPC for server code: the private endpoint when set, else the public one. */
export function serverRpc() {
  return (
    process.env.ROBINHOOD_RPC_URL ||
    process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL ||
    PUBLIC_RPC
  );
}

export const TOKEN = {
  get isLive() {
    return isAddress(BRAND.ca);
  },
};

export function explorerAddress(address: string) {
  return `${CHAIN.explorer}/address/${address}`;
}
export function explorerToken(address: string) {
  return `${CHAIN.explorer}/token/${address}`;
}
export function shortAddress(address: string, head = 6, tail = 4) {
  if (address.length <= head + tail + 2) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}
