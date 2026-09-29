import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = { title: "Privacy Policy", description: `How ${BRAND.domain} handles data.` };

export default function PrivacyPage() {
  return (
    <LegalPage
      title={["Privacy", "Policy"]}
      updated="September 29, 2026"
      intro={`This policy explains what data ${BRAND.domain} handles and why. The short version: we collect as little as possible and store almost nothing.`}
      sections={[
        { h: "Wallet addresses", p: ["When you connect a wallet, your public address is stored in your own browser so the Site can reconnect you. The Site's server relays read-only requests for that address to Robinhood Chain to show your balance. We do not keep a list of connected addresses."] },
        { h: "Forms", p: ["The contact and newsletter forms currently validate your input in your browser only. Nothing you type into them is transmitted or stored. If that changes, this policy will be updated before it does."] },
        { h: "Network requests", p: ["To show live data, the Site's server contacts public RPC endpoints and public price feeds. Those providers see requests from our server, not from you."] },
        { h: "Cookies and analytics", p: ["The Site does not use advertising cookies or third-party analytics. Local browser storage is used only to remember your wallet connection."] },
        { h: "Public blockchain data", p: ["Transactions on Robinhood Chain are public by design. Anything you do onchain can be seen by anyone, independent of this Site."] },
        { h: "Your choices", p: ["Disconnect your wallet from the wallet panel at any time; this clears the stored connection. Clearing your browser storage has the same effect."] },
        { h: "Contact", p: [`For privacy questions use the contact page or reach ${BRAND.xHandle} on X.`] },
      ]}
    />
  );
}
