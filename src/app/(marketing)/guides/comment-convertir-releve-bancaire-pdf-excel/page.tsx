import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comment convertir un releve bancaire PDF en Excel",
  description:
    "Guide complet pour convertir un releve bancaire PDF en fichier Excel ou CSV. Methode automatique avec ReleveFacile, compatible toutes banques francaises.",
};

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment convertir un releve bancaire PDF en Excel",
    description: "Guide complet pour transformer vos releves bancaires PDF en fichiers Excel exploitables.",
    author: { "@type": "Organization", name: "ReleveFacile" },
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>{" > "}
        <span>Convertir un releve PDF en Excel</span>
      </nav>

      <article className="prose max-w-none">
        <h1>Comment convertir un releve bancaire PDF en Excel</h1>

        <p>
          Vous recevez vos releves bancaires au format PDF mais vous avez besoin de les exploiter dans Excel pour votre
          comptabilite ? Ce guide vous explique comment convertir automatiquement n&apos;importe quel releve bancaire francais
          en fichier Excel ou CSV.
        </p>

        <h2>Pourquoi convertir un releve bancaire PDF ?</h2>
        <p>
          Les releves bancaires PDF sont pratiques pour la consultation, mais ils ne sont pas exploitables
          directement dans un tableur. Copier-coller les transactions une par une est fastidieux et source d&apos;erreurs.
          La conversion automatique permet de :
        </p>
        <ul>
          <li>Gagner des heures de saisie manuelle chaque mois</li>
          <li>Eliminer les erreurs de transcription</li>
          <li>Importer directement dans votre logiciel comptable</li>
          <li>Analyser vos depenses avec des tableaux croises dynamiques</li>
          <li>Archiver vos transactions dans un format standard</li>
        </ul>

        <h2>Methode automatique avec ReleveFacile</h2>
        <p>
          <Link href="/convertir" className="text-brand-600 font-medium">ReleveFacile</Link> est un outil en ligne
          specialise dans la conversion de releves bancaires francais. Voici comment l&apos;utiliser :
        </p>
        <ol>
          <li><strong>Creez un compte gratuit</strong> — 3 conversions offertes chaque mois, aucune carte bancaire requise.</li>
          <li><strong>Uploadez votre PDF</strong> — Glissez-deposez votre fichier sur la zone d&apos;upload. Taille max : 10 Mo.</li>
          <li><strong>Verifiez les transactions</strong> — L&apos;outil detecte automatiquement votre banque et extrait les transactions. Verifiez le resultat dans l&apos;apercu.</li>
          <li><strong>Telechargez votre fichier</strong> — Choisissez le format CSV (gratuit) ou Excel (.xlsx, plan Pro).</li>
        </ol>

        <h2>Banques francaises compatibles</h2>
        <p>
          ReleveFacile est compatible avec les principales banques francaises : BNP Paribas, Credit Agricole,
          Societe Generale, LCL, La Banque Postale, Boursorama, Caisse d&apos;Epargne, Credit Mutuel, CIC et
          Banque Populaire. Consultez la <Link href="/banques" className="text-brand-600">liste complete des banques</Link>.
        </p>

        <h2>Format du fichier exporte</h2>
        <p>
          Le fichier CSV genere utilise le format francais standard : separateur point-virgule, virgule comme
          separateur decimal, dates au format JJ/MM/AAAA, et encodage UTF-8 avec BOM pour une ouverture
          correcte dans Excel. Le fichier Excel (.xlsx) inclut en plus une mise en forme automatique avec
          en-tetes en gras et alternance de couleurs.
        </p>

        <h2>Conseils pour un meilleur resultat</h2>
        <ul>
          <li>Utilisez le PDF original telecharge depuis votre banque (pas un scan)</li>
          <li>Evitez les releves proteges par mot de passe — supprimez la protection avant l&apos;upload</li>
          <li>Pour les releves de plusieurs pages, uploadez le PDF complet (pas page par page)</li>
        </ul>

        <div className="bg-brand-50 rounded-xl p-6 text-center not-prose mt-8">
          <p className="font-bold text-lg mb-2">Pret a convertir votre releve ?</p>
          <Link
            href="/convertir"
            className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Convertir maintenant — c&apos;est gratuit
          </Link>
        </div>
      </article>
    </main>
  );
}
