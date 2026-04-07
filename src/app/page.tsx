import { SUPPORTED_BANKS } from "@/data/banks";
import Link from "next/link";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReleveFacile",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Convertissez vos releves bancaires PDF en fichiers Excel et CSV. Compatible avec toutes les banques francaises.",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "EUR", name: "Gratuit" },
      { "@type": "Offer", price: "9.90", priceCurrency: "EUR", name: "Pro" },
      { "@type": "Offer", price: "29", priceCurrency: "EUR", name: "Cabinet" },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Convertissez vos releves bancaires PDF en Excel
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Extraction automatique de vos transactions. Compatible avec toutes les banques francaises.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/convertir"
            className="bg-white text-brand-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Convertir un releve
          </Link>
          <Link
            href="/tarifs"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white/10 transition-colors"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* Compatible banks */}
      <section className="py-12 px-4 text-center border-b">
        <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-6">
          Compatible avec vos banques
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {SUPPORTED_BANKS.map((bank) => (
            <Link
              key={bank.slug}
              href={`/banques/${bank.slug}`}
              className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              {bank.name}
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Comment ca marche</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Uploadez votre PDF</h3>
              <p className="text-gray-600">
                Glissez-deposez votre releve bancaire PDF. Tous les formats sont acceptes, jusqu&apos;a 10 Mo.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">On extrait les transactions</h3>
              <p className="text-gray-600">
                Notre outil detecte votre banque et extrait chaque transaction automatiquement en moins de 5 secondes.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Telechargez Excel ou CSV</h3>
              <p className="text-gray-600">
                Recuperez vos transactions en format francais, pretes a importer dans Excel ou votre logiciel comptable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi ReleveFacile ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">&#9889;</div>
              <h3 className="font-bold text-lg mb-2">Rapide</h3>
              <p className="text-gray-600">Conversion en moins de 5 secondes, meme pour les releves de 10+ pages.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">&#127467;&#127479;</div>
              <h3 className="font-bold text-lg mb-2">Format francais</h3>
              <p className="text-gray-600">Virgule decimale, separateur point-virgule, dates DD/MM/YYYY. Pret pour Excel FR.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">&#128274;</div>
              <h3 className="font-bold text-lg mb-2">Securise et conforme</h3>
              <p className="text-gray-600">Vos PDFs sont supprimes immediatement apres extraction. 100% conforme RGPD.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="font-bold">Chiffrement SSL</p>
            <p className="text-sm text-gray-500">Connexion securisee de bout en bout</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <p className="font-bold">Serveurs en France</p>
            <p className="text-sm text-gray-500">Donnees traitees et hebergees en UE</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <p className="font-bold">PDF supprime apres conversion</p>
            <p className="text-sm text-gray-500">Aucune donnee bancaire stockee</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ils utilisent ReleveFacile</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                &quot;Je passais 2 heures par mois a ressaisir les releves de mes clients. Maintenant c&apos;est fait en 10
                minutes. Indispensable pour un cabinet comptable.&quot;
              </p>
              <div>
                <p className="font-bold">Sophie Laurent</p>
                <p className="text-sm text-gray-500">Expert-comptable, Paris</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                &quot;Le format CSV est parfait pour mon logiciel de compta. Plus besoin de reformater les virgules et les
                dates. Ca marche du premier coup.&quot;
              </p>
              <div>
                <p className="font-bold">Thomas Mercier</p>
                <p className="text-sm text-gray-500">Auto-entrepreneur, Lyon</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                &quot;J&apos;ai teste avec mes releves BNP et Credit Agricole, les deux fonctionnent impeccablement. Le
                rapport qualite-prix du plan Pro est imbattable.&quot;
              </p>
              <div>
                <p className="font-bold">Marie Dubois</p>
                <p className="text-sm text-gray-500">Freelance en gestion, Bordeaux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Pret a simplifier votre comptabilite ?</h2>
        <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
          Commencez gratuitement avec 3 conversions par mois. Aucune carte bancaire requise.
        </p>
        <Link
          href="/inscription"
          className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-brand-700 transition-colors"
        >
          Creer mon compte gratuit
        </Link>
      </section>
    </main>
  );
}
