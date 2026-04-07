import { BANKS, BANK_SLUGS, SUPPORTED_BANKS } from "@/data/banks";
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
    alternates: {
      canonical: `/banques/${bankSlug}`,
    },
  };
}

export default async function BankPage({ params }: { params: Promise<{ bankSlug: string }> }) {
  const { bankSlug } = await params;
  const bank = BANKS[bankSlug];

  if (!bank) {
    notFound();
  }

  const otherBanks = SUPPORTED_BANKS.filter((b) => b.slug !== bankSlug).slice(0, 6);

  const jsonLd = bank.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: bank.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/banques" className="hover:text-brand-600">
          Banques
        </Link>
        {" > "}
        <span>{bank.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">{bank.seoTitle}</h1>
      <p className="text-gray-600 mb-8 text-lg">{bank.seoDescription}</p>

      {/* CTA */}
      <div className="bg-brand-50 rounded-xl p-6 mb-10 text-center">
        <p className="font-medium mb-3">Convertissez votre releve {bank.name} maintenant</p>
        <Link
          href="/convertir"
          className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
        >
          Commencer gratuitement
        </Link>
        <p className="text-sm text-gray-500 mt-2">3 conversions gratuites par mois, aucune carte requise</p>
      </div>

      {/* How it works for this bank */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Comment convertir un releve {bank.name} ?</h2>
        <ol className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span>Telechargez votre releve {bank.name} au format PDF depuis votre espace client en ligne ou votre application mobile.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span>Deposez le fichier PDF sur ReleveFacile. Notre outil detecte automatiquement qu&apos;il s&apos;agit d&apos;un releve {bank.name}.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span>Verifiez les transactions extraites, puis telechargez votre fichier Excel ou CSV.</span>
          </li>
        </ol>
      </section>

      {/* Supported formats */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Formats {bank.name} supportes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Releve de compte courant
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Releves multi-pages
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Export CSV format francais
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Export Excel (.xlsx)
          </li>
        </ul>
      </section>

      {/* FAQ */}
      {bank.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Questions frequentes — {bank.name}</h2>
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

      {/* Other banks */}
      <section className="border-t pt-10">
        <h2 className="text-xl font-bold mb-4">Autres banques compatibles</h2>
        <div className="flex flex-wrap gap-3">
          {otherBanks.map((b) => (
            <Link
              key={b.slug}
              href={`/banques/${b.slug}`}
              className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              {b.name}
            </Link>
          ))}
          <Link
            href="/banques"
            className="px-4 py-2 text-sm font-medium text-brand-600 hover:underline"
          >
            Voir toutes les banques
          </Link>
        </div>
      </section>
    </main>
  );
}
