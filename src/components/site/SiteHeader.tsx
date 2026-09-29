"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, type NavItem } from "@/config/nav";
import { Logo } from "@/components/Logo";
import { CopyCaPill } from "@/components/CopyCa";
import { WalletButton } from "@/components/wallet/WalletButton";
import { SearchDialog } from "@/components/site/SearchDialog";
import { ChevronDown, CloseIcon, DocIcon, FundMark, MenuIcon, SearchIcon, TreasuryMark, VaultMark } from "@/components/icons";

function ItemIcon({ icon }: { icon?: NavItem["icon"] }) {
  const cls = "size-7 shrink-0 text-ink";
  if (icon === "fund") return <FundMark className={cls} />;
  if (icon === "vault") return <VaultMark className={cls} />;
  if (icon === "treasury") return <TreasuryMark className={cls} />;
  if (icon === "doc") return <DocIcon className={cls} />;
  return <span className="grid size-7 shrink-0 place-items-center rounded-md bg-paper-2 text-[11px] font-medium text-ink">→</span>;
}

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 rounded-md px-2.5 py-2 text-[13px] text-ink hover:bg-ink/5"
      >
        {label}
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-2">
          <ul className="rounded-xl bg-card p-2 shadow-[0_12px_40px_rgb(0_0_0/0.12)]">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-paper">
                  <ItemIcon icon={item.icon} />
                  <span>
                    <span className="block text-[14px] font-medium leading-tight text-ink">{item.label}</span>
                    {item.hint && <span className="block text-[12px] leading-tight text-mute">{item.hint}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Atlas Fund home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((group) => (
            <Dropdown key={group.label} label={group.label} items={group.items} />
          ))}
          <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="ml-1 grid size-9 place-items-center rounded-md text-ink hover:bg-ink/5">
            <SearchIcon className="size-[18px]" />
          </button>
          <CopyCaPill className="ml-2" />
          <Link href="/app" className="btn btn-light btn-sm ml-2">
            Launch app
          </Link>
          <WalletButton className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <CopyCaPill className="max-[420px]:hidden" />
          <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="grid size-10 place-items-center rounded-md text-ink">
            <SearchIcon className="size-5" />
          </button>
          <button type="button" onClick={() => setMenu((v) => !v)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} className="grid size-10 place-items-center rounded-md text-ink">
            {menu ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-ink/10 bg-paper lg:hidden">
          <div className="wrap space-y-6 py-6">
            <div className="grid grid-cols-1 gap-2 border-b border-ink/10 pb-5 sm:grid-cols-3">
              <CopyCaPill className="w-full justify-center py-2.5" />
              <Link href="/app" className="btn btn-light w-full">
                Launch app
              </Link>
              <WalletButton full className="py-3" />
            </div>
            {NAV.map((group) => (
              <div key={group.label}>
                <p className="label">{group.label}</p>
                <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-card">
                        <ItemIcon icon={item.icon} />
                        <span className="min-w-0">
                          <span className="block text-[15px] font-medium text-ink">{item.label}</span>
                          {item.hint && <span className="block truncate text-[12px] text-mute">{item.hint}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {search && <SearchDialog onClose={() => setSearch(false)} />}
    </header>
  );
}
