"use client";

import { CHAIN, TOKEN } from "@/config/brand";
import { useWallet } from "@/components/wallet/WalletProvider";
import { WalletButton } from "@/components/wallet/WalletButton";
import { fmtUsd, useChainFacts } from "@/components/LiveChain";

/**
 * Subscribe / deposit panel for a fund or vault page. The wallet part is
 * real (connect, network, live balance); the action itself stays closed until
 * the product contracts are deployed, and says so.
 */
export function DepositPanel({ product, asset, verb = "Deposit" }: { product: string; asset: string; verb?: string }) {
  const { address, balance, onRobinhoodChain, switchNetwork, switching } = useWallet();
  const { ethUsd } = useChainFacts();
  return (
    <div className="card border border-ink/10 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-medium text-ink">
          {verb} into {product}
        </p>
        <span className="pill">Opens at launch</span>
      </div>

      <label className="mt-5 block text-[12px] text-mute">
        Amount ({asset})
        <input disabled placeholder="0.00" className="mt-1.5 h-11 w-full cursor-not-allowed rounded-lg border border-ink/10 bg-card-2 px-3 font-mono text-[15px] text-ink/60 outline-none" />
      </label>

      <dl className="mt-4 space-y-2 text-[13px]">
        <div className="flex justify-between">
          <dt className="text-mute">Wallet</dt>
          <dd className="font-medium text-ink">{address ? (onRobinhoodChain ? CHAIN.name : "Wrong network") : "Not connected"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-mute">ETH balance (live)</dt>
          <dd className="font-mono text-ink">
            {address ? (balance === null ? "…" : `${balance} ETH`) : "—"}
            {address && balance !== null && ethUsd !== null && <span className="ml-1 text-mute">≈ {fmtUsd(Number(balance) * ethUsd)}</span>}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-mute">Contract</dt>
          <dd className="text-ink">Deployed at launch</dd>
        </div>
      </dl>

      <div className="mt-5">
        {!address ? (
          <WalletButton full label="Connect wallet to continue" className="py-3" />
        ) : !onRobinhoodChain ? (
          <button type="button" onClick={switchNetwork} disabled={switching} className="btn w-full py-3">
            {switching ? "Confirm in your wallet…" : `Switch to ${CHAIN.name}`}
          </button>
        ) : (
          <button type="button" disabled className="btn w-full py-3">
            {verb} opens at launch
          </button>
        )}
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-mute">
        No transaction can be sent from this page yet. {TOKEN.isLive ? "" : "The $ATLAS contract address and product contracts are published at launch."}
      </p>
    </div>
  );
}
