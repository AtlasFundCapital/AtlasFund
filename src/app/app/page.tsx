import type { Metadata } from "next";
import { AppDashboard } from "@/components/app/AppDashboard";

export const metadata: Metadata = {
  title: "App",
  description: "Connect a wallet to Robinhood Chain, read your live balance and see every Atlas Fund product in one place.",
};

export default function AppPage() {
  return (
    <section className="wrap py-10">
      <p className="label">Atlas app</p>
      <h1 className="mt-2 text-[34px] font-medium tracking-[-0.03em] text-ink sm:text-[44px]">Your Atlas dashboard</h1>
      <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-body">
        Wallet connection and chain readings are live. Deposits and subscriptions switch on here when the product contracts are deployed.
      </p>
      <div className="mt-8">
        <AppDashboard />
      </div>
    </section>
  );
}
