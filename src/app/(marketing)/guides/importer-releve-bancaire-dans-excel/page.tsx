import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Importer un releve bancaire dans Excel",
  description:
    "Tutoriel pas a pas pour importer un releve bancaire CSV ou Excel dans Microsoft Excel ou Google Sheets avec le bon format francais.",
};

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Importer un releve bancaire dans Excel",
    author: { "@type": "Organization", name: "ReleveFacile" },
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/guides" className="hover:text-brand-600">Guides</Link>{" > "}
        <span>Importer dans Excel</span>
      </nav>

      <article className="prose max-w-none">
        <h1>Importer un releve bancaire dans Excel</h1>

        <p>
          Une fois votre releve bancaire converti en CSV ou Excel avec{" "}
          <Link href="/convertir" className="text-brand-600">ReleveFacile</Link>, voici comment l&apos;importer
          correctement dans Microsoft Excel ou Google Sheets.
        </p>

        <h2>Importer un fichier Excel (.xlsx)</h2>
        <p>
          Si vous avez exporte au format Excel (disponible avec le{" "}
          <Link href="/tarifs" className="text-brand-600">plan Pro</Link>), c&apos;est le plus simple :
          double-cliquez sur le fichier .xlsx. Il s&apos;ouvre directement dans Excel avec la mise en forme,
          les colonnes correctes et les montants au format EUR.
        </p>

        <h2>Importer un fichier CSV dans Excel</h2>
        <p>
          Le CSV genere par ReleveFacile utilise le format francais (separateur point-virgule, virgule decimale).
          Pour l&apos;ouvrir correctement :
        </p>
        <ol>
          <li>Ouvrez Excel</li>
          <li>Allez dans <strong>Fichier &gt; Ouvrir</strong></li>
          <li>Selectionnez le fichier CSV</li>
          <li>Excel devrait detecter automatiquement le format francais grace a l&apos;encodage UTF-8 BOM</li>
        </ol>
        <p>
          Si les colonnes ne sont pas separees correctement, utilisez l&apos;assistant d&apos;importation :
          Donnees &gt; A partir d&apos;un fichier texte/CSV, puis selectionnez &quot;Point-virgule&quot; comme delimiteur.
        </p>

        <h2>Importer dans Google Sheets</h2>
        <ol>
          <li>Ouvrez Google Sheets</li>
          <li>Allez dans <strong>Fichier &gt; Importer</strong></li>
          <li>Selectionnez votre fichier CSV</li>
          <li>Dans les options d&apos;importation, choisissez le separateur &quot;Point-virgule&quot;</li>
          <li>Les donnees s&apos;importent avec les bonnes colonnes</li>
        </ol>

        <h2>Verifier les montants</h2>
        <p>
          Apres l&apos;import, verifiez que les montants sont bien reconnus comme des nombres (pas du texte).
          Dans Excel, les cellules contenant des nombres sont alignees a droite par defaut. Si elles sont
          alignees a gauche, il faut convertir le format.
        </p>

        <h2>Astuces pour aller plus loin</h2>
        <ul>
          <li>Utilisez un tableau croise dynamique pour analyser vos depenses par categorie</li>
          <li>Creez des graphiques pour visualiser l&apos;evolution de votre solde</li>
          <li>Ajoutez une colonne &quot;Categorie&quot; pour classer vos transactions manuellement</li>
          <li>Combinez plusieurs releves mensuels dans un meme classeur pour une vue annuelle</li>
        </ul>

        <div className="bg-brand-50 rounded-xl p-6 text-center not-prose mt-8">
          <p className="font-bold text-lg mb-2">Convertissez votre releve en un clic</p>
          <Link
            href="/convertir"
            className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Convertir un releve PDF
          </Link>
        </div>
      </article>
    </main>
  );
}
