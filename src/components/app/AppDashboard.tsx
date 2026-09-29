"use client";

import Link from "next/link";
import { BRAND, CHAIN, TOKEN, explorerAddress, shortAddress } from "@/config/brand";
import { useWallet } from "@/components/wallet/WalletProvider";
import { WalletButton } from "@/components/wallet/WalletButton";
import { CopyCaPill } from "@/components/CopyCa";
import { fmtGas, fmtUsd, useChainFacts } from "@/components/LiveChain";
import { ArrowRight, FundMark, VaultMark } from "@/components/icons";
import { FUNDS, VAULTS } from "@/content/products";

function Tile({ label, value, sub, live = false }: { label: string; value: React.ReactNode; sub?: React.ReactNode; live?: boolean }) {
  return (
    <div className="card p-4">
      <p className="flex items-center gap-2 text-[12px] text-mute">
        {live && <span className="size-1.5 rounded-full bg-sage" />}
        {label}
      </p>
      <p className="h-number mt-1.5 truncate text-[22px] leading-tight">{value}</p>
      {sub && <p className="mt-1 truncate text-[12px] text-mute">{sub}</p>}
    </div>
  );
}

export function AppDashboard() {
  const { address, walletName, balance, onRobinhoodChain, chainId, switchNetwork, switching, disconnect } = useWallet();
  const { block, gasGwei, ethUsd, ethChange, priceSource, ok } = useChainFacts();
  const usd = balance !== null && ethUsd !== null ? Number(balance) * ethUsd : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.2fr_1fr]">
        <div className="card flex flex-col justify-between gap-6 p-6">
          {address ? (
            <>
              <div>
                <p className="label">{walletName ?? "Wallet"} · connected</p>
                <a href={explorerAddress(address)} target="_blank" rel="noreferrer" className="mt-2 block break-all font-mono text-[18px] text-ink hover:underline sm:text-[22px]">
                  {shortAddress(address, 10, 8)}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-card-2 p-4">
                  <p className="text-[12px] text-mute">ETH balance (live)</p>
                  <p className="h-number mt-1 text-[24px]">{balance ?? "…"}</p>
                  <p className="text-[12px] text-mute">{usd !== null ? `≈ ${fmtUsd(usd)}` : " "}</p>
                </div>
                <div className="rounded-lg bg-card-2 p-4">
                  <p className="text-[12px] text-mute">Network</p>
                  <p className={`mt-1 text-[16px] font-medium ${onRobinhoodChain ? "text-sage" : "text-amber-700"}`}>{onRobinhoodChain ? CHAIN.name : "Wrong network"}</p>
                  <p className="text-[12px] text-mute">Wallet chain id {chainId ?? "…"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {!onRobinhoodChain && (
                  <button type="button" onClick={switchNetwork} disabled={switching} className="btn">
                    {switching ? "Confirm in your wallet…" : `Switch to ${CHAIN.name}`}
                  </button>
                )}
                <button type="button" onClick={disconnect} className="btn btn-light">
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="label">Wallet</p>
                <p className="mt-2 text-[24px] tracking-tight text-ink">Connect to see your position</p>
                <p className="mt-2 max-w-[440px] text-[14px] leading-relaxed text-body">
                  We will find the wallets in your browser, ask for one account and move it to {CHAIN.name} (chain id {CHAIN.id}). Nothing is signed.
                </p>
              </div>
              <WalletButton className="self-start px-5 py-3 text-[14px]" />
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Tile live label="Block" value={block ? `#${block.toLocaleString("en-US")}` : ok === false ? "offline" : "…"} sub={CHAIN.name} />
          <Tile live label="Gas price" value={fmtGas(gasGwei)} sub="Read through our relay" />
          <Tile live label="ETH / USD" value={fmtUsd(ethUsd)} sub={ethChange !== null ? `${ethChange >= 0 ? "+" : ""}${ethChange.toFixed(2)}% 24h · ${priceSource}` : "Public price feed"} />
          <div className="card flex flex-col justify-between p-4">
            <p className="text-[12px] text-mute">{BRAND.symbol} contract</p>
            <CopyCaPill className="mt-2 self-start" />
            <p className="mt-1 text-[12px] text-mute">{TOKEN.isLive ? "Click to copy" : "Published at launch"}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="h-section mb-4">Products</p>
        <div className="space-y-2">
          {[...VAULTS.map((v) => ({ href: `/vaults/${v.slug}`, name: v.name, kind: `${v.tier} vault`, asset: v.asset, Icon: VaultMark })), ...FUNDS.map((f) => ({ href: `/funds/${f.slug}`, name: f.name, kind: "Fund", asset: f.asset, Icon: FundMark }))].map((p) => (
            <Link key={p.href} href={p.href} className="card grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 transition-colors hover:bg-card-2 sm:grid-cols-[auto_2fr_1fr_1fr_auto]">
              <p.Icon className="size-8 text-ink" />
              <span className="min-w-0">
                <span className="block truncate text-[16px] text-ink">{p.name}</span>
                <span className="block text-[12px] text-mute sm:hidden">
                  {p.kind} · {p.asset}
                </span>
              </span>
              <span className="hidden text-[13px] text-body sm:block">{p.kind}</span>
              <span className="hidden text-[13px] text-body sm:block">{p.asset}</span>
              <span className="flex items-center gap-2">
                <span className="pill hidden sm:inline-flex">Opens at launch</span>
                <span className="grid size-8 place-items-center rounded-md bg-ink text-white">
                  <ArrowRight className="size-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
