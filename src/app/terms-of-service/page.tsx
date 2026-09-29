import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = { title: "Terms of Service", description: `Terms for using ${BRAND.domain}.` };

export default function TermsPage() {
  return (
    <LegalPage
      title={["Website", "Terms of Service"]}
      updated="September 29, 2026"
      intro={`These terms govern your use of ${BRAND.domain} (the "Site"), operated by ${BRAND.name} ("we", "us"). By using the Site you agree to them. If you do not agree, please do not use the Site.`}
      sections={[
        { h: "Eligibility", p: ["You may use the Site only if you can form a binding agreement under the laws that apply to you, and only where using it is lawful."] },
        { h: "Information only", p: ["Everything on the Site is general information about products that are being designed or operated onchain. Nothing on the Site is an offer, a solicitation, investment advice, or a recommendation to buy, sell or hold any asset.", "Figures marked as samples, targets or illustrations are not results and must not be relied on as such."] },
        { h: "Wallet connection", p: ["Connecting a wallet shares your public address with the Site so it can read balances from Robinhood Chain. We never receive your private keys. Any transaction is created and signed in your own wallet, and you are responsible for reviewing it."] },
        { h: "The $ATLAS token", p: [`The only valid ${BRAND.symbol} contract address is the one shown on the Site's header and footer once published. Holding ${BRAND.symbol} does not give you any ownership of, or claim on, funds, vaults or mandates.`] },
        { h: "Risks", p: ["Onchain products carry risks including smart contract failure, oracle failure, market illiquidity, network outages and total loss. Automation reduces some risks and introduces others. Only use products you understand."] },
        { h: "Third-party services", p: ["The Site links to and reads from third-party services such as block explorers, public RPC endpoints and price feeds. We do not control them and are not responsible for their availability or accuracy."] },
        { h: "Intellectual property", p: [`The Site's text, design, illustrations and marks belong to ${BRAND.name}. You may share links and quote short passages with attribution.`] },
        { h: "No warranty and limitation of liability", p: ["The Site is provided as is, without warranties of any kind. To the fullest extent allowed by law, we are not liable for losses arising from your use of the Site or reliance on its content."] },
        { h: "Changes", p: ["We may update these terms. The date above shows the latest version; continued use of the Site means you accept it."] },
        { h: "Contact", p: [`Questions about these terms can be sent through the contact page or to ${BRAND.xHandle} on X.`] },
      ]}
    />
  );
}
