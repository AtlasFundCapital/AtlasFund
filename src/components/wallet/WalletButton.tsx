"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CHAIN, explorerAddress, shortAddress } from "@/config/brand";
import { useWallet } from "@/components/wallet/WalletProvider";
import { CheckIcon, CloseIcon, CopyIcon } from "@/components/icons";
import { fmtUsd, useChainFacts } from "@/components/LiveChain";

/** Header button: opens the wallet panel, shows the short address once connected. */
export function WalletButton({ className = "", full = false, label = "Connect wallet" }: { className?: string; full?: boolean; label?: string }) {
  const { address, onRobinhoodChain } = useWallet();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`btn btn-sm ${full ? "w-full" : ""} ${className}`}>
        {address ? (
          <>
            <span className={`size-2 rounded-full ${onRobinhoodChain ? "bg-emerald-400" : "bg-amber-400"}`} />
            <span className="font-mono">{shortAddress(address, 5, 4)}</span>
          </>
        ) : (
          label
        )}
      </button>
      {open && <WalletPanel onClose={() => setOpen(false)} />}
    </>
  );
}

function WalletPanel({ onClose }: { onClose: () => void }) {
  const wallet = useWallet();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);
  // Portalled to <body>: the sticky header uses backdrop-filter, which would
  // otherwise trap this fixed overlay inside the header box.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/45 p-4" onMouseDown={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Wallet"
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] rounded-xl bg-card-2 p-6 text-ink shadow-2xl"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-mute hover:text-ink">
          <CloseIcon className="size-5" />
        </button>
        {wallet.address ? <Connected /> : <Picker />}
        {wallet.error && (
          <p className="mt-4 rounded-lg bg-brass-3/70 px-3 py-2 text-[13px] text-ink" role="alert">
            {wallet.error}{" "}
            <button type="button" onClick={wallet.clearError} className="font-medium underline">
              Dismiss
            </button>
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Picker() {
  const { wallets, connect, connecting } = useWallet();
  return (
    <div>
      <p className="text-[20px] font-medium tracking-tight">Connect a wallet</p>
      <p className="mt-2 text-[14px] leading-relaxed text-body">
        Atlas Fund settles on {CHAIN.name}. Choose a browser wallet; we will ask it to switch to the network, or add it if it is new.
      </p>
      <ul className="mt-5 space-y-2">
        {wallets.map((w) => (
          <li key={w.rdns}>
            <button
              type="button"
              disabled={connecting || Boolean(w.unsupported)}
              onClick={() => connect(w)}
              className="flex w-full items-center gap-3 rounded-lg border border-ink/10 bg-card px-4 py-3 text-left text-[15px] transition-colors hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {w.icon ? <img src={w.icon} alt="" className="size-7 rounded-md" /> : <span className="size-7 rounded-md bg-paper-2" />}
              <span className="flex-1">{w.name}</span>
              <span className="text-[12px] text-mute">{w.unsupported ? "Not supported" : connecting ? "Waiting…" : "Connect"}</span>
            </button>
          </li>
        ))}
      </ul>
      {wallets.length === 0 && (
        <div className="mt-5 rounded-lg bg-card px-4 py-4 text-[14px] leading-relaxed">
          No browser wallet detected. Install MetaMask, Rabby or another EVM wallet, then reload this page.
        </div>
      )}
      <p className="mt-4 text-[12px] leading-relaxed text-mute">Connecting shares your public address only. No signature or transaction is requested.</p>
    </div>
  );
}

function Connected() {
  const { address, walletName, balance, onRobinhoodChain, switchNetwork, switching, disconnect } = useWallet();
  const { block, ethUsd } = useChainFacts();
  const [copied, setCopied] = useState(false);
  if (!address) return null;
  const usd = balance !== null && ethUsd !== null ? Number(balance) * ethUsd : null;
  return (
    <div>
      <p className="label">{walletName ?? "Wallet"} connected</p>
      <div className="mt-2 flex items-center gap-2">
        <a href={explorerAddress(address)} target="_blank" rel="noreferrer" className="font-mono text-[18px] hover:underline">
          {shortAddress(address, 8, 6)}
        </a>
        <button
          type="button"
          aria-label="Copy address"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(address);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            } catch {}
          }}
          className="grid size-8 place-items-center rounded-md bg-card hover:bg-paper-2"
        >
          {copied ? <CheckIcon className="size-4 text-sage" /> : <CopyIcon className="size-4" />}
        </button>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-2 text-[13px]">
        <div className="rounded-lg bg-card p-3">
          <dt className="text-mute">Balance</dt>
          <dd className="mt-1 text-[17px] font-medium">{balance === null ? "…" : `${balance} ${CHAIN.nativeSymbol}`}</dd>
          {usd !== null && <dd className="text-[12px] text-mute">≈ {fmtUsd(usd)}</dd>}
        </div>
        <div className="rounded-lg bg-card p-3">
          <dt className="text-mute">Network</dt>
          <dd className={`mt-1 text-[15px] font-medium ${onRobinhoodChain ? "text-sage" : "text-amber-700"}`}>
            {onRobinhoodChain ? CHAIN.name : "Wrong network"}
          </dd>
          <dd className="text-[12px] text-mute">Chain ID {CHAIN.id}</dd>
        </div>
      </dl>
      <p className="mt-3 text-[12px] text-mute">{block ? `${CHAIN.name} block #${block.toLocaleString("en-US")}` : `Reading ${CHAIN.name}…`}</p>
      {!onRobinhoodChain && (
        <button type="button" onClick={switchNetwork} disabled={switching} className="btn mt-4 w-full">
          {switching ? "Confirm in your wallet…" : `Switch to ${CHAIN.name}`}
        </button>
      )}
      <div className="mt-5 border-l-2 border-brass pl-3 text-[13px] leading-relaxed text-body">
        Fund subscriptions and vault deposits open at launch. Stay connected and this panel will be where you start.
      </div>
      <button type="button" onClick={disconnect} className="mt-5 text-[13px] font-medium text-ink underline underline-offset-4">
        Disconnect
      </button>
    </div>
  );
}
