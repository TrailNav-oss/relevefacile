import { PLANS } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Choisissez le plan ReleveFacile adapte a vos besoins. Gratuit, Pro ou Cabinet.",
};

const planOrder = ["free", "pro", "cabinet"] as const;

export default function PricingPage() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Tarifs simples et transparents</h1>
        <p className="text-gray-600">Commencez gratuitement. Passez au Pro quand vous en avez besoin.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {planOrder.map((key) => {
          const plan = PLANS[key];
          const isPopular = key === "pro";

          return (
            <div
              key={key}
              className={`relative border rounded-2xl p-6 ${isPopular ? "border-brand-600 ring-2 ring-brand-600" : "border-gray-200"}`}
            >
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Populaire
                </span>
              )}

              <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
              <p className="text-3xl font-bold mb-4">
                {plan.price === 0 ? "0 EUR" : `${plan.price.toFixed(2).replace(".", ",")} EUR`}
                <span className="text-sm font-normal text-gray-500">/mois</span>
              </p>

              <ul className="space-y-2 mb-6 text-sm">
                <li>
                  {plan.conversionsPerMonth === -1
                    ? "Conversions illimitees"
                    : `${plan.conversionsPerMonth} conversions/mois`}
                </li>
                <li>Formats : {plan.formats.map((f) => f.toUpperCase()).join(", ")}</li>
                <li>
                  {plan.maxPreviewRows === -1
                    ? "Toutes les transactions"
                    : `${plan.maxPreviewRows} transactions max`}
                </li>
                {plan.watermark && <li className="text-gray-400">Avec watermark</li>}
                {plan.batchUpload && <li>Upload multi-fichiers</li>}
                {plan.apiAccess && <li>API REST</li>}
              </ul>

              <button
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  isPopular
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {key === "free" ? "Commencer" : "S'abonner"}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
