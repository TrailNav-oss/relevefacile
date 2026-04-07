import { BANKS } from "@/data/banks";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Banques compatibles",
  description: "Liste de toutes les banques francaises compatibles avec ReleveFacile pour la conversion de releves PDF.",
};

export default function BanquesPage() {
  const banks = Object.values(BANKS);

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Banques compatibles</h1>
      <p className="text-gray-600 mb-8">
        ReleveFacile prend en charge les releves de {banks.filter((b) => b.isSupported).length} banques francaises.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banks.map((bank) => (
          <Link
            key={bank.slug}
            href={`/banques/${bank.slug}`}
            className="block p-4 border rounded-xl hover:border-brand-500 hover:shadow-sm transition-all"
          >
            <p className="font-medium">{bank.name}</p>
            {bank.isSupported ? (
              <span className="text-xs text-success font-medium">Compatible</span>
            ) : (
              <span className="text-xs text-gray-400">Bientot</span>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
