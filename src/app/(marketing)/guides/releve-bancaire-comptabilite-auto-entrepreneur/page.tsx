import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Releve bancaire et comptabilite auto-entrepreneur",
  description:
    "Comment utiliser vos releves bancaires pour simplifier la comptabilite de votre micro-entreprise. Obligations, outils et bonnes pratiques.",
};

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Releve bancaire et comptabilite auto-entrepreneur",
    author: { "@type": "Organization", name: "ReleveFacile" },
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>{" > "}
        <span>Comptabilite auto-entrepreneur</span>
      </nav>

      <article className="prose max-w-none">
        <h1>Releve bancaire et comptabilite auto-entrepreneur</h1>

        <p>
          En tant qu&apos;auto-entrepreneur (micro-entrepreneur), vous devez tenir un livre des recettes
          et parfois un registre des achats. Vos releves bancaires sont une source precieuse pour
          reconstituer ces informations. Voici comment les exploiter efficacement.
        </p>

        <h2>Obligations comptables de l&apos;auto-entrepreneur</h2>
        <p>
          Contrairement aux societes, les auto-entrepreneurs beneficient d&apos;obligations simplifiees :
        </p>
        <ul>
          <li><strong>Livre des recettes</strong> — obligatoire pour tous. Il doit mentionner la date, le client, le montant et le mode de paiement de chaque encaissement.</li>
          <li><strong>Registre des achats</strong> — obligatoire uniquement pour les activites de vente de marchandises.</li>
          <li><strong>Compte bancaire dedie</strong> — obligatoire si votre CA depasse 10 000 EUR pendant 2 annees consecutives.</li>
        </ul>

        <h2>Comment ReleveFacile simplifie votre comptabilite</h2>
        <ol>
          <li><strong>Exportez votre releve</strong> — Telechargez le PDF depuis votre banque en ligne</li>
          <li><strong>Convertissez-le</strong> — Uploadez-le sur <Link href="/convertir" className="text-brand-600">ReleveFacile</Link> pour obtenir un fichier Excel ou CSV</li>
          <li><strong>Filtrez vos recettes</strong> — Dans Excel, filtrez les credits pour isoler vos encaissements professionnels</li>
          <li><strong>Remplissez votre livre</strong> — Copiez les informations dans votre livre des recettes</li>
        </ol>

        <h2>Astuce : automatiser le rapprochement</h2>
        <p>
          Si vous utilisez un compte bancaire dedie a votre activite, toutes les transactions de votre
          releve sont professionnelles. Vous pouvez alors utiliser directement le fichier CSV exporte
          comme base de votre livre des recettes, en ajoutant simplement le nom du client a cote
          de chaque transaction.
        </p>

        <h2>Conserver vos justificatifs</h2>
        <p>
          En France, les auto-entrepreneurs doivent conserver leurs justificatifs comptables pendant
          10 ans. Archivez vos releves PDF originaux ET les fichiers Excel exports dans un dossier
          organise par annee et par mois.
        </p>

        <h2>Logiciels comptables compatibles</h2>
        <p>
          Le format CSV de ReleveFacile est compatible avec les logiciels les plus utilises par
          les auto-entrepreneurs : Henrri (gratuit), Freebe, MyAE, et la plupart des tableurs.
        </p>

        <div className="bg-brand-50 rounded-xl p-6 text-center not-prose mt-8">
          <p className="font-bold text-lg mb-2">Simplifiez votre comptabilite</p>
          <p className="text-gray-600 text-sm mb-3">3 conversions gratuites par mois, sans engagement</p>
          <Link
            href="/inscription"
            className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Creer mon compte gratuit
          </Link>
        </div>
      </article>
    </main>
  );
}
