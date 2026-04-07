import { BANKS, BANK_SLUGS } from "@/data/banks";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return BANK_SLUGS.map((slug) => ({ bankSlug: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ bankSlug: string }> }): Promise<Metadata> {
  const { bankSlug } = await params;
  const bank = BANKS[bankSlug];
  if (!bank) return {};

  return {
    title: bank.seoTitle,
    description: bank.seoDescription,
    openGraph: {
      title: bank.seoTitle,
      description: bank.seoDescription,
    },
  };
}

export default async function BankPage({ params }: { params: Promise<{ bankSlug: string }> }) {
  const { bankSlug } = await params;
  const bank = BANKS[bankSlug];

  if (!bank) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/banques" className="hover:text-brand-600">
          Banques
        </Link>
        {" > "}
        <span>{bank.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">{bank.seoTitle}</h1>
      <p className="text-gray-600 mb-8">{bank.seoDescription}</p>

      {/* CTA */}
      <div className="bg-brand-50 rounded-xl p-6 mb-8 text-center">
        <p className="font-medium mb-3">Convertissez votre releve {bank.name} maintenant</p>
        <Link
          href="/"
          className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
        >
          Commencer gratuitement
        </Link>
      </div>

      {/* FAQ */}
      {bank.faq.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Questions frequentes</h2>
          <div className="space-y-4">
            {bank.faq.map((item, i) => (
              <details key={i} className="border rounded-lg p-4">
                <summary className="font-medium cursor-pointer">{item.question}</summary>
                <p className="mt-2 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
