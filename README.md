# Atlas Fund

**Discipline, Automation, Transparency.** Onchain asset management on Robinhood Chain.

Website: https://atlasfund.capital · X: [@atlasfund](https://x.com/atlasfund) · Token: `$ATLAS`

## The problem

Most onchain capital is managed by habit instead of by policy. Treasuries sit in a single wallet and move whenever someone has
time. Yield products publish their rules only after something breaks. Depositors cannot see what their money is allowed to do,
and when a market turns, the response depends on who happens to be awake.

## The solution

Atlas Fund runs three products that share one rulebook:

- **Funds**: tokenised portfolios behind a single share token, priced from onchain net asset value every block.
- **Vaults**: automated lending strategies in two risk tiers (Anchor and Summit) with published caps, idle buffers and exit
  conditions enforced by agents.
- **Treasuries**: mandates run under an investment policy the client helps write, executed from the client's own account.

Every permitted action is written into an onchain policy before capital moves, assets are never taken into custody, and every
position can be checked on the explorer.

## What you can try

Live today:

- Connect a browser wallet (MetaMask, Rabby and other EIP-6963 wallets). The site switches it to Robinhood Chain, or adds the
  network if the wallet does not know it, and reconnects quietly on your next visit.
- Your live ETH balance on Robinhood Chain, with a USD estimate from a public price feed.
- Live chain readings: latest block, gas price, average block time and the most recent blocks (`/analytics`, `/app`).
- The full product designs: funds, vaults, treasury process, docs, blog and brand kit.

Coming at launch:

- The `$ATLAS` contract address in the navbar and footer, with one-click copy.
- Vault deposits and fund subscriptions (the panels are in place and say "opens at launch").
- Live product charts. Until then every chart and figure that is not read from the chain is labelled as a sample.

## Run it locally

Requirements: Node.js 20 or newer.

1. Download ZIP or fork this repository, then open the folder.
2. Install and build:

   ```bash
   npm install
   npm run build
   npm start
   ```

3. Open http://localhost:4720

Optional environment variables (put them in `.env.local`; nothing is required to run):

| Name | Purpose |
|---|---|
| `ROBINHOOD_RPC_URL` | Private Robinhood Chain RPC used by the server, for example an Alchemy URL. |
| `NEXT_PUBLIC_ROBINHOOD_RPC_URL` | Public-safe RPC override. |

Without them the public endpoint is used, with a second public endpoint as fallback.

`npm run assets` regenerates the icons, social card and dotted illustrations.

## Add the network to your wallet

The site does this for you when you connect. To add it by hand:

| Field | Value |
|---|---|
| Network name | Robinhood Chain |
| Chain ID | 4663 (hex `0x1237`) |
| Currency | ETH |
| RPC URL | https://rpc.mainnet.chain.robinhood.com |
| Explorer | https://robinhoodchain.blockscout.com |

## Project layout

```
src/
  app/                 routes (home, funds, vaults, treasuries, blog, docs, app, analytics, ...)
  app/api/rpc          read-only JSON-RPC relay (allow-listed methods)
  app/api/price        ETH/USD from public tickers, cached for a minute
  components/wallet    EIP-6963 wallet provider and wallet panel
  components/site      header, footer, forms, shared blocks
  components/app       dashboard, deposit panel, live blocks
  content/             articles, products, docs and company copy
  config/brand.ts      name, links, network and the token contract address
scripts/               asset generator (icons, social card, illustrations)
public/                generated images (.webp)
```

## Token contract

The `$ATLAS` contract address is published on launch day in the site header, mobile menu and footer. Only trust the address
shown on atlasfund.capital and the official X account. Holding `$ATLAS` is not a share of any fund, vault or mandate, and nothing
in this repository is financial advice.
