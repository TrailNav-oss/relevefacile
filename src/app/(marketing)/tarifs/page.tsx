import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Decouvrez les tarifs de ReleveFacile : gratuit pour 3 conversions/mois, Pro a 9,90 EUR/mois pour un usage illimite, Cabinet a 29 EUR/mois avec API et batch.",
};

const PRICING_FAQ = [
  {
    question: "Puis-je changer de plan a tout moment ?",
    answer: "Oui. Vous pouvez passer du plan Gratuit au Pro ou Cabinet a tout moment. Le changement prend effet immediatement.",
  },
  {
    question: "Comment annuler mon abonnement ?",
    answer:
      "Depuis votre espace compte, cliquez sur \"Gerer l'abonnement\". Vous serez redirige vers le portail Stripe ou vous pouvez annuler en un clic. L'acces continue jusqu'a la fin de la periode payee.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes Visa, Mastercard et American Express via notre partenaire de paiement securise Stripe.",
  },
  {
    question: "Y a-t-il un engagement de duree ?",
    answer: "Non, aucun engagement. Les abonnements sont mensuels et vous pouvez annuler a tout moment sans frais.",
  },
  {
    question: "Que se passe-t-il si je depasse mes 3 conversions gratuites ?",
    answer:
      "Un message vous invitera a passer au plan Pro. Votre compteur de conversions se remet a zero le 1er de chaque mois.",
  },
];

export default function PricingPage() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Tarifs simples et transparents</h1>
        <p className="text-gray-600">Commencez gratuitement. Passez au Pro quand vous en avez besoin.</p>
      </div>

      <PricingCards />

      <p className="text-center text-sm text-gray-500 mt-6">
        Satisfait ou rembourse 30 jours. Aucun engagement, annulation en un clic.
      </p>

      {/* Pricing FAQ */}
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Questions sur les tarifs</h2>
        <div className="space-y-4">
          {PRICING_FAQ.map((item, i) => (
            <details key={i} className="border rounded-lg p-4">
              <summary className="font-medium cursor-pointer">{item.question}</summary>
              <p className="mt-3 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
