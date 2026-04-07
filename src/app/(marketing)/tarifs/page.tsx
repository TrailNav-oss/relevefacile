import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Decouvrez les tarifs de ReleveFacile : gratuit pour 3 conversions/mois, Pro a 9,90 EUR/mois pour un usage illimite, Cabinet a 29 EUR/mois avec API et batch.",
};

export default function PricingPage() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Tarifs simples et transparents</h1>
        <p className="text-gray-600">Commencez gratuitement. Passez au Pro quand vous en avez besoin.</p>
      </div>
      <PricingCards />
    </main>
  );
}
