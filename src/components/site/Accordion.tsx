"use client";

import Link from "next/link";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";

export type AccordionItem = { title: string; lead: string; text: string; cta?: { label: string; href: string } };

/** Stacked rows that open one at a time. */
export function Accordion({ items, first = -1 }: { items: AccordionItem[]; first?: number }) {
  const [open, setOpen] = useState(first);
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="card">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="text-[22px] font-normal tracking-tight text-ink sm:text-[28px]">{item.title}</span>
              {isOpen ? <MinusIcon className="size-5 shrink-0 text-ink" /> : <PlusIcon className="size-5 shrink-0 text-ink" />}
            </button>
            {isOpen && (
              <div className="flex flex-col gap-4 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
                <div className="max-w-[560px]">
                  <p className="text-[14px] font-semibold text-ink">{item.lead}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-body">{item.text}</p>
                </div>
                {item.cta && (
                  <Link href={item.cta.href} className="btn btn-sm shrink-0 self-start sm:self-end">
                    {item.cta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
